#!/usr/bin/env node
import "source-map-support/register";
import { Webapp } from "./webapp/compontent";
import { DOMAIN_NAME, DOMAIN_CERTIFICATE_ARN } from "./constants";
import { App } from "aws-cdk-lib";
import { Backend } from "./backend/component";
import { Authentication } from "./authentication/component";

export type Environment = {
  account: string;
  region: string;
};

const app = new App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT!,
  region: process.env.CDK_DEFAULT_REGION!,
};

const webappProps = {
  env: env,
  domainName: DOMAIN_NAME,
  domainCertificateArn: DOMAIN_CERTIFICATE_ARN,
};
new Webapp(app, "ToDoList", webappProps);

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

const backendProps = {
  env: env,
  rootDomain: DOMAIN_NAME,
  domainName: `api.${DOMAIN_NAME}`,
  userPool,
};
new Backend(app, "ToDoListBackend", backendProps);

app.synth();
