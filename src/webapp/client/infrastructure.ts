import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class Client extends Construct {
  public sourceBucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.sourceBucket = new Bucket(scope, 'Bucket', {
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('./assets')],
      destinationBucket: this.sourceBucket,
    });
  }
}
