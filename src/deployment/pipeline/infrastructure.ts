import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
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
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(githubRepo, githubBranch),
        commands: ["npm ci", "npm run preall:deploy", "npx cdk synth"],
      }),
    });
  }
}
