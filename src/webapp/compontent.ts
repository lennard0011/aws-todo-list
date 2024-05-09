import { Stack } from "aws-cdk-lib";
import { Client } from "./client/infrastructure";
import { Construct } from "constructs";
import { ContentDeliveryNetwork } from "./cdn/infrastructure";
import { Environment } from "../app";

type Props = {
  env: Environment;
  domainName: string;
  certificateArn: string;
};

export class Webapp extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    const { env, domainName, certificateArn } = props;
    super(scope, id, { env });

    const client = new Client(this, "Client");
    new ContentDeliveryNetwork(this, "ContentDeliveryNetwork", {
      sourceBucket: client.sourceBucket,
      domainName,
      certificateArn,
    });
  }
}
