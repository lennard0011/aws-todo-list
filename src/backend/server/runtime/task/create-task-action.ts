import { DynamoDbClient } from "../dynamo-db/dynamo-db-client";
import { TaskStatus } from "./task";

type TaskDto = {
  title: string;
  description: string;
};

export class CreateTaskAction {
  constructor(private readonly dynamoDbClient: DynamoDbClient) {}

  async handle(userId: string, taskDto: TaskDto) {
    console.log(`Creating task for user ${userId}`);
    console.log(`Task: ${JSON.stringify(taskDto)}`);

    await this.dynamoDbClient.createTask(userId, {
      title: taskDto.title,
      description: taskDto.description,
      status: TaskStatus.OPEN,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "",
    };
  }
}
