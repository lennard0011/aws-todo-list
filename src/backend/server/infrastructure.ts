import {
  Code,
  Function as LambdaFunction,
  Runtime
} from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
import { join } from 'path'

type Props = {
  tableName: string
}

export class Server extends Construct {
  readonly lambdaFunction: LambdaFunction

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)

    const { tableName } = props

    this.lambdaFunction = new LambdaFunction(this, 'Lambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: Code.fromAsset(join(__dirname, './runtime')),
      environment: {
        TASK_TABLE_NAME: tableName
      }
    })
  }
}
