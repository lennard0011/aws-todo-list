import { Duration } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  CachedMethods,
  Distribution,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

type Props = {
  sourceBucket: Bucket;
  domainName: string;
  domainCertificateArn: string;
};

export class ContentDeliveryNetwork extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { sourceBucket, domainName, domainCertificateArn } = props;

    const zone = HostedZone.fromLookup(this, "Zone", { domainName });
    const siteDomain = domainName;
    const cloudfrontOAI = new OriginAccessIdentity(this, "cloudfront-OAI", {
      comment: `OAI for ${id}`,
    });

    const getS3ObjectPolicy = new PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [sourceBucket.arnForObjects("*")],
      principals: [
        new CanonicalUserPrincipal(
          cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId,
        ),
      ],
    });

    sourceBucket.addToResourcePolicy(getS3ObjectPolicy);

    const certificate = Certificate.fromCertificateArn(
      this,
      "Certificate",
      domainCertificateArn,
    );

    const distribution = new Distribution(this, "CDNWebDistribution", {
      defaultRootObject: "index.html",
      domainNames: [siteDomain],
      certificate,
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2019,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new S3Origin(sourceBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new ARecord(this, "SiteAliasRecord", {
      recordName: siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });
  }
}
