import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import { randomUUID } from 'crypto'

import type { TaskData, TaskStatus } from '../task/task'

const TASK_TABLE_NAME = process.env.TASK_TABLE_NAME!

export interface CreateTaskDto {
  title: string
  description: string
  status: TaskStatus
}

export class DynamoDbClient {
  private readonly client: DynamoDBDocumentClient

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION
    })
    this.client = DynamoDBDocumentClient.from(client)
  }

  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    console.log(`Creating task for user ${userId}`)
    console.log(`Task: ${JSON.stringify(createTaskDto)}`)

    const id = randomUUID()

    const command = new PutCommand({
      TableName: TASK_TABLE_NAME,
      Item: {
        userId,
        taskId: id,
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status
      }
    })

    const response = await this.client.send(command)
    console.log(response)
    return id
  }

  async getTasks(userId: string) {
    console.log(`Getting tasks for user ${userId}`)

    const command = new QueryCommand({
      TableName: TASK_TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    const response = await this.client.send(command)
    const items = response.Items as
      | { taskId: string; title: string; description: string; status: string }[]
      | undefined

    if (!items) {
      return []
    }

    const tasks = items.map((item) => {
      return {
        id: item.taskId,
        title: item.title,
        description: item.description,
        status: item.status
      }
    }) as TaskData[]

    return tasks
  }

  async updateTask(
    userId: string,
    taskId: string,
    taskData: Partial<Omit<TaskData, 'id'>>
  ) {
    console.log(`Updating task for user ${userId}`)
    console.log(`Task: ${JSON.stringify(taskData)}`)

    let updateExpression = ''
    const expressionAttributeValues: Record<string, unknown> = {}

    Object.entries(taskData).forEach(([attributeName, value], index) => {
      if (index === 0) {
        updateExpression = 'SET '
      }

      const nameSpace = `:${attributeName}`
      updateExpression += `${attributeName} = ${nameSpace}`

      if (index < Object.keys(taskData).length - 1) {
        updateExpression += ', '
      }

      expressionAttributeValues[nameSpace] = value
    })

    const command = new UpdateCommand({
      TableName: TASK_TABLE_NAME,
      Key: {
        userId,
        taskId
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues
    })

    const response = await this.client.send(command)
    console.log(response)
    return response
  }

  async deleteTask(userId: string, taskId: string) {
    console.log(`Deleting task ${taskId} for user ${userId}`)

    const command = new DeleteCommand({
      TableName: TASK_TABLE_NAME,
      Key: {
        userId,
        taskId
      }
    })

    await this.client.send(command)
  }
}
