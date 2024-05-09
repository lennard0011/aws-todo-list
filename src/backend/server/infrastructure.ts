import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from 'path';

export class Server extends Construct {
    readonly lambdaFunction: Function;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.lambdaFunction = new Function(this, 'Lambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromAsset(join(__dirname, './runtime')),
        });
    }
}