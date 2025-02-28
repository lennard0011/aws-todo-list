import type { RecordTarget } from 'aws-cdk-lib/aws-route53'
import { ARecord, HostedZone } from 'aws-cdk-lib/aws-route53'
import type { Construct } from 'constructs'

export function addARecord(
  scope: Construct,
  aRecordLogicalId: string,
  rootDomain: string,
  newRecord: string,
  target: RecordTarget
) {
  const zone = HostedZone.fromLookup(scope, 'RootZone', {
    domainName: rootDomain
  })

  new ARecord(scope, aRecordLogicalId, {
    recordName: newRecord,
    target,
    zone
  })
}
