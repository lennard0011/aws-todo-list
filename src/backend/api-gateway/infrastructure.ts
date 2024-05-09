import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Function } from "aws-cdk-lib/aws-lambda";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import * as routeTargets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

type Props = {
    handler: Function;
    rootDomain: string;
    domainName: string;
};

export class ApiGateway extends Construct {
    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id);

        const { handler, rootDomain, domainName } = props;

        const zone = HostedZone.fromLookup(this, 'rootZone', {
            domainName: rootDomain,
        });

        const certificate = new Certificate(this, 'BackendCertificate', {
            domainName,
        });

        const lambdaRestApi = new LambdaRestApi(this, 'Api', {
            handler,
            proxy: true,
            domainName: {
                domainName,
                certificate,
            }
        })

        new ARecord(this, "apiAliasRecord", {
            recordName: domainName,
            target: RecordTarget.fromAlias(
                new routeTargets.ApiGateway(lambdaRestApi)
            ),
            zone,
          });
    }
}