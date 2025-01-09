import { Stack } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

import type { Environment } from '../app'
import { ContentDeliveryNetwork } from './cdn/infrastructure'
import { Client } from './client/infrastructure'

interface Props {
  env: Environment
  domainName: string
  domainCertificateArn: string
}

export class Webapp extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    const { env, domainName, domainCertificateArn } = props
    super(scope, id, { env })

    const client = new Client(this, 'Client')
    new ContentDeliveryNetwork(this, 'ContentDeliveryNetwork', {
      client,
      domainName,
      domainCertificateArn
    })
  }
}
