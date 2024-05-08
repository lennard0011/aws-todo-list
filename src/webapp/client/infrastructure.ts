import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import path = require("path");

export class Client extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const siteBucket = new Bucket(scope, 'Bucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      autoDeleteObjects: true,
    });

    // Grant public read access to view website
    siteBucket.grantPublicAccess();

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset(path.join(__dirname, './site-content'))],
      destinationBucket: siteBucket,
    });
  }
}
