import { DynamoDbClient } from './dynamo-db/dynamo-db-client'
import { CreateTaskAction } from './task/create-task-action'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetTasksAction } from './task/get-task-action'
import { DeleteTaskAction } from './task/delete-task-action'

const notAuthorizedResponse = {
  statusCode: 401,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: 'Not Authorized'
}

const badRequestResponse = {
  statusCode: 400,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: 'Bad Request'
}

const notFoundResponse = {
  statusCode: 404,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: 'Not Found'
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userId = event.requestContext?.authorizer?.claims.sub

  if (!userId) {
    return notAuthorizedResponse
  }

  const path = event.path
  const method = event.httpMethod
  const body = event.body ? (JSON.parse(event.body) as unknown) : undefined

  const dynamoDbClient = new DynamoDbClient()

  switch (true) {
    case path.startsWith('/task'):
      switch (method) {
        case 'POST': {
          if (!body) {
            return badRequestResponse
          }
          if (typeof body !== 'object') {
            return badRequestResponse
          }
          if (!('title' in body) || typeof body.title !== 'string') {
            return badRequestResponse
          }
          if (
            !('description' in body) ||
            typeof body.description !== 'string'
          ) {
            return badRequestResponse
          }

          const { title, description } = body

          const createTaskAction = new CreateTaskAction(dynamoDbClient)
          return await createTaskAction.handle(userId, {
            title,
            description
          })
        }
        case 'GET': {
          const getTasksAction = new GetTasksAction(dynamoDbClient)
          return getTasksAction.handle(userId)
        }
        case 'DELETE': {
          const splitPath = path.split('/')
          if (splitPath.length !== 3) {
            return notFoundResponse
          }
          const id = splitPath[2]
          const deleteTaskAction = new DeleteTaskAction(dynamoDbClient)
          return deleteTaskAction.handle(userId, id)
        }
        default:
          return notFoundResponse
      }
  }

  return notFoundResponse
}
