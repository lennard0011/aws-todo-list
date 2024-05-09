#!/usr/bin/env node
import 'source-map-support/register';
import { Webapp } from './webapp/compontent';
import { DOMAIN_NAME, WEBAPP_CERTIFICATE_ARN } from './constants';
import { App } from 'aws-cdk-lib';
import { Backend } from './backend/component';

export type Environment = {
    account: string;
    region: string;
}

const app = new App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT!,
    region: process.env.CDK_DEFAULT_REGION!,
}

const webappProps = {
    env: env,
    domainName: DOMAIN_NAME,
    certificateArn: WEBAPP_CERTIFICATE_ARN,
}
new Webapp(app, 'ToDoList', webappProps);

const backendProps = {
    env: env,
    rootDomain: DOMAIN_NAME,
    domainName: `api.${DOMAIN_NAME}`,
}
new Backend(app, 'ToDoListBackend', backendProps);

app.synth();