import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Environment } from "../app";
import { Server } from "./server/infrastructure";
import { ApiGateway } from "./api-gateway/infrastructure";
import { UserPool } from "aws-cdk-lib/aws-cognito";

type Props = {
  env: Environment;
  rootDomain: string;
  domainName: string;
  userPool: UserPool;
};

export class Backend extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    const { domainName, rootDomain, env, userPool } = props;
    super(scope, id, { env });

    const server = new Server(this, "Server");
    const { lambdaFunction } = server;

    new ApiGateway(this, "ApiGateway", {
      domainName,
      rootDomain,
      handler: lambdaFunction,
      userPool,
    });
  }
}
