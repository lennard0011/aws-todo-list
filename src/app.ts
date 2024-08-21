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

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT!,
  region: process.env.CDK_DEFAULT_REGION!,
};

export class Application extends Stack {
  constructor(scope: Construct, id: string, props: { env: Environment }) {
    super(scope, id, props);

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

new Application(app, "ToDoListApplication", { env });

app.synth();
