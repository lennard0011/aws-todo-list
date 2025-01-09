import { Stack } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

import type { Environment } from '../app'
import { Pipeline } from './pipeline/infrastructure'

interface Props {
  env: Environment
  githubRepo: string
  githubBranch: string
}

export class Deployment extends Stack {
  readonly pipeline: Pipeline

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    this.pipeline = new Pipeline(this, 'Pipeline', props)
  }
}
