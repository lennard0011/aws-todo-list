import { DynamoDbClient } from '../dynamo-db/dynamo-db-client'

export class GetTasksAction {
  constructor(private readonly dynamoDbClient: DynamoDbClient) {}

  async handle(userId: string) {
    console.log(`Getting tasks for user ${userId}`)

    const tasks = await this.dynamoDbClient.getTasks(userId)

    console.log(`Tasks: ${JSON.stringify(tasks)}`)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(tasks)
    }
  }
}
