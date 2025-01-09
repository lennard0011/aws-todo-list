import { Stack } from 'aws-cdk-lib'
import type { UserPool } from 'aws-cdk-lib/aws-cognito'
import type { Construct } from 'constructs'

import type { Environment } from '../app'
import { ApiGateway } from './api-gateway/infrastructure'
import { Database } from './database/infrastructure'
import { Server } from './server/infrastructure'

interface Props {
  env: Environment
  rootDomain: string
  domainName: string
  userPool: UserPool
}

export class Backend extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    const { domainName, rootDomain, env, userPool } = props
    super(scope, id, { env })

    const tableName = 'TaskTable'

    const server = new Server(this, 'Server', { tableName })
    const { lambdaFunction } = server

    new ApiGateway(this, 'ApiGateway', {
      domainName,
      rootDomain,
      handler: lambdaFunction,
      userPool
    })

    const database = new Database(this, 'Database', { tableName })

    database.table.grantReadWriteData(lambdaFunction)
  }
}
