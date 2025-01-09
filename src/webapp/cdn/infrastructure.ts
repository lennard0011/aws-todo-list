import { Duration } from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import {
  AllowedMethods,
  CachedMethods,
  Distribution,
  OriginAccessIdentity,
  PriceClass,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy
} from 'aws-cdk-lib/aws-cloudfront'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { Construct } from 'constructs'

import type { Client } from '../client/infrastructure'

interface Props {
  client: Client
  domainName: string
  domainCertificateArn: string
}

export class ContentDeliveryNetwork extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)

    const { client, domainName, domainCertificateArn } = props
    const { sourceBucket } = client

    const zone = HostedZone.fromLookup(this, 'Zone', { domainName })
    const siteDomain = domainName
    const cloudfrontOAI = new OriginAccessIdentity(this, 'cloudfront-OAI', {
      comment: `OAI for ${id}`
    })

    const getS3ObjectPolicy = new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [sourceBucket.arnForObjects('*')],
      principals: [
        new CanonicalUserPrincipal(
          cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
        )
      ]
    })

    sourceBucket.addToResourcePolicy(getS3ObjectPolicy)

    const certificate = Certificate.fromCertificateArn(
      this,
      'Certificate',
      domainCertificateArn
    )

    const distribution = new Distribution(this, 'CDNWebDistribution', {
      defaultRootObject: 'index.html',
      domainNames: [siteDomain],
      certificate,
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          ttl: Duration.minutes(30),
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        },
        {
          httpStatus: 404,
          ttl: Duration.minutes(30),
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        }
      ],
      defaultBehavior: {
        origin: new S3Origin(sourceBucket, {
          originAccessIdentity: cloudfrontOAI
        }),
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      priceClass: PriceClass.PRICE_CLASS_100
    })

    new ARecord(this, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone
    })

    client.deployContent(distribution)
  }
}
