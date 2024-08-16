import { DynamoDbClient } from "../dynamo-db/dynamo-db-client";
import { TaskStatus } from "./task";

type CreateTaskDto = {
  title: string;
  description: string;
};

export class CreateTaskAction {
  constructor(private readonly dynamoDbClient: DynamoDbClient) {}

  async handle(userId: string, CreateTaskDto: CreateTaskDto) {
    console.log(`Creating task for user ${userId}`);
    console.log(`Task: ${JSON.stringify(CreateTaskDto)}`);

    const taskId = await this.dynamoDbClient.createTask(userId, {
      title: CreateTaskDto.title,
      description: CreateTaskDto.description,
      status: TaskStatus.OPEN,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: taskId,
      }),
    };
  }
}
