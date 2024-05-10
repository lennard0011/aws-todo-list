import {
  CognitoUserPoolsAuthorizer,
  LambdaRestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Function } from "aws-cdk-lib/aws-lambda";
import { RecordTarget } from "aws-cdk-lib/aws-route53";
import * as routeTargets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import { addARecord } from "../../utils/addARecord";

type Props = {
  handler: Function;
  rootDomain: string;
  domainName: string;
  userPool: UserPool;
};

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { handler, rootDomain, domainName, userPool } = props;

    const certificate = Certificate.fromCertificateArn(
      this,
      "Certificate",
      "arn:aws:acm:us-east-1:154880243201:certificate/97562f96-7409-412e-8199-edcbe491db77",
    );

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "MyCognitoAuthorizer",
      {
        cognitoUserPools: [userPool],
      },
    );

    const lambdaRestApi = new LambdaRestApi(this, "lambdaRestApi", {
      handler,
      proxy: true,
      domainName: {
        domainName,
        certificate,
      },
      defaultMethodOptions: {
        authorizer,
      },
    });

    addARecord(
      this,
      "apiAliasRecord",
      rootDomain,
      domainName,
      RecordTarget.fromAlias(new routeTargets.ApiGateway(lambdaRestApi)),
    );
  }
}
