import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Environment } from "../app";
import { Server } from "./server/infrastructure";
import { ApiGateway } from "./api-gateway/infrastructure";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Database } from "./database/infrastructure";

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

    const tableName = "TaskTable";

    const server = new Server(this, "Server", { tableName });
    const { lambdaFunction } = server;

    new ApiGateway(this, "ApiGateway", {
      domainName,
      rootDomain,
      handler: lambdaFunction,
      userPool,
    });

    new Database(this, "Database", { tableName });
  }
}
