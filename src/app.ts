#!/usr/bin/env node
import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { GitHubActionRole } from 'cdk-pipelines-github'

import { GITHUB_REPO } from './constants'
import { Deployment } from './deployment/component'

export interface Environment {
  account: string
  region: string
}

const app = new App()

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT || '154880243201', // Replace with your AWS account ID
  region: process.env.CDK_DEFAULT_REGION || 'eu-central-1'
}

const deploymentProps = {
  env: env,
  githubRepo: GITHUB_REPO,
  githubBranch: 'main'
}
class MyGitHubActionRole extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    new GitHubActionRole(this, 'github-action-role', {
      repos: [GITHUB_REPO]
    })
  }
}

new MyGitHubActionRole(app, 'MyGitHubActionRoleStack', { env })

new Deployment(app, 'ToDoListDeployment', deploymentProps)

app.synth()
