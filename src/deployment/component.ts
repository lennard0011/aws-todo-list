import { Stack } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

import type { Environment } from '../app'
import { AwsCredentials, GitHubWorkflow } from 'cdk-pipelines-github'
import { ShellStep } from 'aws-cdk-lib/pipelines'
import { ApplicationDeployment } from './pipeline/application-deployment/infrastructure'

interface Props {
  env: Environment
  githubRepo: string
  githubBranch: string
}

export class Deployment extends Stack {
  readonly pipeline: GitHubWorkflow

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    this.pipeline = new GitHubWorkflow(this, 'GitHubWorkflow', {
      synth: new ShellStep('Build', {
        commands: ['npm ci', ' npm run all:build', 'npx cdk synth']
      }),
      awsCreds: AwsCredentials.fromOpenIdConnect({
        gitHubActionRoleArn: `arn:aws:iam::${props.env.account}:role/GitHubActionsRole`,
        roleSessionName: 'GitHubActionsSession'
      })
    })

    const applicationDeployment = new ApplicationDeployment(
      this,
      'ToDoListApplicationDeployment',
      {
        env: props.env
      }
    )

    this.pipeline.addStage(applicationDeployment)
  }
}
