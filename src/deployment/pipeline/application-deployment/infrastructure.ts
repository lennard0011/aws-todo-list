import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Application } from "../../../app";

export class ApplicationDeployment extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new Application(this, "Application", {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT!,
        region: process.env.CDK_DEFAULT_REGION!,
      },
    });
  }
}
