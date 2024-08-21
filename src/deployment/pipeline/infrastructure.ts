import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
import { ApplicationDeployment } from "./application-deployment/infrastructure";
import { Environment } from "../../app";

type Props = {
  env: Environment;
  githubRepo: string;
  githubBranch: string;
};

export class Pipeline extends Stack {
  public readonly pipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { githubRepo, githubBranch } = props;

    this.pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "CDKPipeline",
      synth: new CodeBuildStep("Synth", {
        input: CodePipelineSource.gitHub(githubRepo, githubBranch),
        commands: ["npm ci", "npm run preall:deploy", "npx cdk synth"],
        rolePolicyStatements: [
          new PolicyStatement({
            actions: ["sts:AssumeRole"],
            resources: ["*"],
            conditions: {
              StringEquals: {
                "iam:ResourceTag/aws-cdk:bootstrap-role": "lookup",
              },
            },
          }),
        ],
      }),
    });

    const applicationDeployment = new ApplicationDeployment(
      this,
      "Deploy",
      props,
    );
    this.pipeline.addStage(applicationDeployment);
  }
}
