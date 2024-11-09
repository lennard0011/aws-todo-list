import { DynamoDbClient } from '../dynamo-db/dynamo-db-client'

export class DeleteTaskAction {
  constructor(private readonly dynamoDbClient: DynamoDbClient) {}

  async handle(userId: string, taskId: string) {
    console.log(`Deleting task ${taskId} for user ${userId}`)

    await this.dynamoDbClient.deleteTask(userId, taskId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({})
    }
  }
}
