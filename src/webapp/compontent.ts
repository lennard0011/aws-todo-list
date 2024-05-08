import { Stack, StackProps } from "aws-cdk-lib";
import { Client } from "./client/infrastructure";
import { Construct } from "constructs";

export class Webapp extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
    
        new Client(this, 'Client');
    }
}