#!/usr/bin/env node
import { Webapp } from "./webapp/component";
import { DOMAIN_NAME, DOMAIN_CERTIFICATE_ARN, GITHUB_REPO } from "./constants";
import { App, Stack } from "aws-cdk-lib";
import { Backend } from "./backend/component";
import { Authentication } from "./authentication/component";
import { Deployment } from "./deployment/component";
import { Construct } from "constructs";

export type Environment = {
  account: string;
  region: string;
};

const app = new App();

export class Application extends Stack {
  constructor(scope: Construct, id: string) {
    const env = {
      account: process.env.CDK_DEFAULT_ACCOUNT!,
      region: process.env.CDK_DEFAULT_REGION!,
    };

    super(scope, id, { env });

    const authenticationProps = {
      env,
      rootDomain: DOMAIN_NAME,
      domainCertificateArn: DOMAIN_CERTIFICATE_ARN,
      authenticationDomainName: `auth.${DOMAIN_NAME}`,
    };
    const authentication = new Authentication(
      app,
      "ToDoListAuthentication",
      authenticationProps,
    );
    const { userPool } = authentication.authRepository;

    const webappProps = {
      env: env,
      domainName: DOMAIN_NAME,
      domainCertificateArn: DOMAIN_CERTIFICATE_ARN,
    };
    new Webapp(app, "ToDoListWebapp", webappProps);

    const backendProps = {
      env: env,
      rootDomain: DOMAIN_NAME,
      domainName: `api.${DOMAIN_NAME}`,
      userPool,
    };
    new Backend(app, "ToDoListBackend", backendProps);

    const deploymentProps = {
      env: env,
      githubRepo: GITHUB_REPO,
      githubBranch: "main",
    };
    new Deployment(app, "ToDoListDeployment", deploymentProps);
  }
}

new Application(app, "ToDoListApplication");

app.synth();
