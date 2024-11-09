import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource
} from 'aws-cdk-lib/pipelines'
import { Construct } from 'constructs'
import { Stack } from 'aws-cdk-lib'
import { ApplicationDeployment } from './application-deployment/infrastructure'
import { Environment } from '../../app'
import {
  AUTH_URL,
  BACKEND_URL,
  USER_POOL_CLIENT_ID,
  USER_POOL_ID,
  DOMAIN_NAME
} from '../../constants'

type Props = {
  env: Environment
  githubRepo: string
  githubBranch: string
}

export class Pipeline extends Stack {
  public readonly pipeline: CodePipeline

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const { githubRepo, githubBranch } = props

    this.pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'CDKPipeline',
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.gitHub(githubRepo, githubBranch),
        commands: ['npm ci', 'npm run preall:deploy', 'npx cdk synth'],
        env: {
          VITE_USER_POOL_ID: USER_POOL_ID,
          VITE_USER_POOL_CLIENT_ID: USER_POOL_CLIENT_ID,
          VITE_BACKEND_URL: `https://${BACKEND_URL}`,
          VITE_AUTH_URL: `https://${AUTH_URL}`,
          VITE_WEBAPP_URL: `https://${DOMAIN_NAME}`
        },
        rolePolicyStatements: [
          new PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: ['*'],
            conditions: {
              StringEquals: {
                'iam:ResourceTag/aws-cdk:bootstrap-role': 'lookup'
              }
            }
          })
        ]
      })
    })

    const applicationDeployment = new ApplicationDeployment(
      this,
      'Deploy',
      props
    )
    this.pipeline.addStage(applicationDeployment)
  }
}
