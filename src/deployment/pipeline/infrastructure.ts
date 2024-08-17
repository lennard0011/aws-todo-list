import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

type Props = {
  githubRepo: string;
  githubBranch: string;
};

export class Pipeline extends Construct {
  public readonly pipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { githubRepo, githubBranch } = props;

    this.pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "CDKPipeline",
      synth: new CodeBuildStep("Synth", {
        input: CodePipelineSource.gitHub(githubRepo, githubBranch),
        commands: ["npm ci", "npm run preall:deploy", "npx cdk synth"],
        rolePolicyStatements: [
          new PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: ['*'],
            conditions: {
              StringEquals: {
                'iam:ResourceTag/aws-cdk:bootstrap-role': 'lookup',
              },
            },
          }),
        ],
      }),
    });
  }
}
