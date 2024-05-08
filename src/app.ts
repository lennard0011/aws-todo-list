#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Webapp } from './webapp/compontent';

const app = new cdk.App();
new Webapp(app, 'ToDoList', {});

app.synth();