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

    const awsCreds = AwsCredentials.fromOpenIdConnect({
      gitHubActionRoleArn: `arn:aws:iam::${props.env.account}:role/GitHubActionsRole`,
      roleSessionName: 'GitHubActionsSession'
    })

    this.pipeline = new GitHubWorkflow(this, 'GitHubWorkflow', {
      synth: new ShellStep('Build', {
        commands: ['npm ci', ' npm run all:build', 'npx cdk synth']
      }),
      awsCreds,
      preBuildSteps: [{
        name: 'Authenticate Via OIDC Role',
        uses: 'aws-actions/configure-aws-credentials@v4',
        with: {
          'aws-region': props.env.region,
          'role-duration-seconds': 1800,
          'role-skip-session-tagging': true,
          'role-to-assume': `arn:aws:iam::${props.env.account}:role/GitHubActionsRole`,
          'role-session-name': 'GitHubActionsSession'
        }
      }]
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
