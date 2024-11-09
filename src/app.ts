#!/usr/bin/env node
import { GITHUB_REPO } from './constants'
import { App } from 'aws-cdk-lib'
import { Deployment } from './deployment/component'

export type Environment = {
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
