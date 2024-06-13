import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { TaskData } from "../task/task";
import { randomUUID } from "crypto";

const TASK_TABLE_NAME = process.env.TASK_TABLE_NAME!;

export class DynamoDbClient {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
    });
    this.client = DynamoDBDocumentClient.from(client);
  }

  async createTask(userId: string, task: TaskData) {
    console.log(`Creating task for user ${userId}`);
    console.log(`Task: ${JSON.stringify(task)}`);

    const taskId = randomUUID();

    const command = new PutCommand({
      TableName: TASK_TABLE_NAME,
      Item: {
        userId,
        taskId,
        title: task.title,
        description: task.description,
      },
    });

    const response = await this.client.send(command);
    console.log(response);
    return response;
  }

  async getTasks(userId: string) {
    console.log(`Getting tasks for user ${userId}`);

    const command = new QueryCommand({
      TableName: TASK_TABLE_NAME,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    });
    const response = await this.client.send(command);

    const tasks = response.Items as TaskData[];

    return tasks;
  }

  async updateTask(
    userId: string,
    taskId: string,
    taskData: Partial<TaskData>,
  ) {
    console.log(`Updating task for user ${userId}`);
    console.log(`Task: ${JSON.stringify(taskData)}`);

    let updateExpression = "";
    const expressionAttributeValues: Record<string, unknown> = {};

    Object.entries(taskData).forEach(([attributeName, value], index) => {
      if (index === 0) {
        updateExpression = "SET ";
      }

      const nameSpace = `:${attributeName}`;
      updateExpression += `${attributeName} = ${nameSpace}`;

      if (index < Object.keys(taskData).length - 1) {
        updateExpression += ", ";
      }

      expressionAttributeValues[nameSpace] = value;
    });

    const command = new UpdateCommand({
      TableName: TASK_TABLE_NAME,
      Key: {
        userId,
        taskId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    const response = await this.client.send(command);
    console.log(response);
    return response;
  }
}
