import { Environment, Stack } from "aws-cdk-lib";
import { Pipeline } from "./pipeline/infrastructure";
import { Construct } from "constructs";

type Props = {
  env: Environment;
  githubRepo: string;
  githubBranch: string;
};

export class Deployment extends Stack {
  readonly pipeline: Pipeline;

  constructor(scope: Construct, id: string, props: Props) {
    const { env } = props;
    super(scope, id, { env });

    this.pipeline = new Pipeline(this, "Pipeline", props);
  }
}
