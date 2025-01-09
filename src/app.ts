#!/usr/bin/env node
import { App } from 'aws-cdk-lib'

import { GITHUB_REPO } from './constants'
import { Deployment } from './deployment/component'

export interface Environment {
  account: string
  region: string
}

const app = new App()

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT!,
  region: process.env.CDK_DEFAULT_REGION!
}

const deploymentProps = {
  env: env,
  githubRepo: GITHUB_REPO,
  githubBranch: 'main'
}

new Deployment(app, 'ToDoListDeployment', deploymentProps)

app.synth()
