import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Environment } from "../app";
import { Server } from "./server/infrastructure";
import { ApiGateway } from "./api-gateway/infrastructure";

type Props = {
  env: Environment;
  rootDomain: string;
  domainName: string;
};

export class Backend extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    const { domainName, rootDomain, env } = props;
    super(scope, id, { env });

    const server = new Server(this, "Server");
    new ApiGateway(this, "ApiGateway", {
      domainName,
      rootDomain,
      handler: server.lambdaFunction,
    });
  }
}
