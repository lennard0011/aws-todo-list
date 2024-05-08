import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class Client extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Bucket(scope, 'Bucket', {
        blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
        encryption: BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        removalPolicy: RemovalPolicy.RETAIN,
        websiteIndexDocument: 'index.html',
        autoDeleteObjects: true,
      });
  }
}