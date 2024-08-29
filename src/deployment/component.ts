import { Stack } from "aws-cdk-lib";
import { Pipeline } from "./pipeline/infrastructure";
import { Construct } from "constructs";
import { Environment } from "../app";

type Props = {
  env: Environment;
  githubRepo: string;
  githubBranch: string;
};

export class Deployment extends Stack {
  readonly pipeline: Pipeline;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    this.pipeline = new Pipeline(this, "Pipeline", props);
  }
}
