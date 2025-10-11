#!/usr/bin/env node
import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { GitHubActionRole } from 'cdk-pipelines-github'

import { ACCOUNT_ID, GITHUB_REPO, REGION } from './constants'
import { Deployment } from './deployment/component'

export interface Environment {
  account: string
  region: string
}

const app = new App()

const env = {
  account: ACCOUNT_ID,
  region: REGION
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
      repos: [GITHUB_REPO],
      roleName: 'GitHubActionRole'
    })
  }
}

new MyGitHubActionRole(app, 'MyGitHubActionRoleStack', { env })

new Deployment(app, 'ToDoListDeployment', deploymentProps)

app.synth()
