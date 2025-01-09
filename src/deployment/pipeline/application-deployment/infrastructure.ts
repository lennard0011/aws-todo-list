import { Stage } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

import type { Environment } from '../../../app'
import { Authentication } from '../../../authentication/component'
import { Backend } from '../../../backend/component'
import { DOMAIN_CERTIFICATE_ARN, DOMAIN_NAME } from '../../../constants'
import { Webapp } from '../../../webapp/component'

interface Props {
  env: Environment
}

export class ApplicationDeployment extends Stage {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const { env } = props

    const authenticationProps = {
      env,
      rootDomain: DOMAIN_NAME,
      domainCertificateArn: DOMAIN_CERTIFICATE_ARN,
      authenticationDomainName: `auth.${DOMAIN_NAME}`
    }
    const authentication = new Authentication(
      this,
      'ToDoListAuthentication',
      authenticationProps
    )
    const { userPool } = authentication.authRepository

    const webappProps = {
      env: env,
      domainName: DOMAIN_NAME,
      domainCertificateArn: DOMAIN_CERTIFICATE_ARN
    }
    new Webapp(this, 'ToDoListWebapp', webappProps)

    const backendProps = {
      env: env,
      rootDomain: DOMAIN_NAME,
      domainName: `api.${DOMAIN_NAME}`,
      userPool
    }
    new Backend(this, 'ToDoListBackend', backendProps)
  }
}
