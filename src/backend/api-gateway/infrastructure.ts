import {
  CognitoUserPoolsAuthorizer,
  Cors,
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function;
  rootDomain: string;
  domainName: string;
  userPool: UserPool;
};

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { handler, rootDomain, domainName, userPool } = props;

    const certificate = new Certificate(this, "ApiGateWayCertificate", {
      domainName,
    });

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
      defaultCorsPreflightOptions: {
        allowOrigins: ["http://localhost:5173", `https://${rootDomain}`],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: Cors.DEFAULT_HEADERS,
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
