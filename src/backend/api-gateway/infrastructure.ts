import {
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaRestApi
} from 'aws-cdk-lib/aws-apigateway'
import {
  Certificate,
  ValidationMethod
} from 'aws-cdk-lib/aws-certificatemanager'
import type { UserPool } from 'aws-cdk-lib/aws-cognito'
import type { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda'
import { RecordTarget } from 'aws-cdk-lib/aws-route53'
import * as routeTargets from 'aws-cdk-lib/aws-route53-targets'
import { Construct } from 'constructs'

import { addARecord } from '../../utils/addARecord'

interface Props {
  handler: LambdaFunction
  rootDomain: string
  domainName: string
  userPool: UserPool
}

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)

    const { handler, rootDomain, domainName, userPool } = props

    const certificate = new Certificate(this, 'ApiGateWayCertificate', {
      domainName,
      validation: {
        method: ValidationMethod.DNS,
        props: {}
      }
    })

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      'MyCognitoAuthorizer',
      {
        cognitoUserPools: [userPool]
      }
    )

    const lambdaRestApi = new LambdaRestApi(this, 'lambdaRestApi', {
      handler,
      proxy: true,
      domainName: {
        domainName,
        certificate
      },
      defaultMethodOptions: {
        authorizer
      },
      defaultCorsPreflightOptions: {
        allowOrigins: ['http://localhost:5173', `https://${rootDomain}`],
        allowHeaders: Cors.DEFAULT_HEADERS
      }
    })

    addARecord(
      this,
      'apiAliasRecord',
      rootDomain,
      domainName,
      RecordTarget.fromAlias(new routeTargets.ApiGateway(lambdaRestApi))
    )
  }
}
