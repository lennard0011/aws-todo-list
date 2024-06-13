import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, Billing, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

type Props = {
  tableName: string;
};

export class Database extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { tableName } = props;

    new TableV2(this, "Table", {
      tableName,
      partitionKey: { name: "userId", type: AttributeType.STRING },
      sortKey: { name: "taskId", type: AttributeType.STRING },
      billing: Billing.onDemand(),
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
    });
  }
}
