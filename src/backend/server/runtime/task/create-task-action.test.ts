import { DynamoDbClient } from '../dynamo-db/dynamo-db-client'
import { CreateTaskAction } from './create-task-action'
import { TaskStatus } from './task'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateTaskAction', () => {
  let mockDynamoDbClient: MockProxy<DynamoDbClient>
  let createTaskAction: CreateTaskAction

  beforeEach(() => {
    mockDynamoDbClient = mock<DynamoDbClient>()
    createTaskAction = new CreateTaskAction(mockDynamoDbClient)
  })

  it('should create a task and return the response', async () => {
    // Arrange
    const userId = 'user123'
    const createTaskDto = {
      title: 'Test Task',
      description: 'This is a test task'
    }
    const mockTaskId = 'task-1-1-1-1'

    mockDynamoDbClient.createTask.mockResolvedValue(mockTaskId)

    // Act
    const response = await createTaskAction.handle(userId, createTaskDto)

    // Assert
    expect(mockDynamoDbClient.createTask).toHaveBeenCalledWith(userId, {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN
    })

    expect(response).toEqual({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        id: mockTaskId
      })
    })
  })

  it('should log messages during execution', async () => {
    // Arrange
    const userId = 'user123'
    const createTaskDto = {
      title: 'Log Test Task',
      description: 'This is a test for logs'
    }
    const mockTaskId = 'task-1-1-1-1'

    mockDynamoDbClient.createTask.mockResolvedValue(mockTaskId)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

    // Act
    await createTaskAction.handle(userId, createTaskDto)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(`Creating task for user ${userId}`)
    expect(consoleSpy).toHaveBeenCalledWith(
      `Task: ${JSON.stringify(createTaskDto)}`
    )

    consoleSpy.mockRestore()
  })

  it('should throw an error if DynamoDbClient.createTask fails', async () => {
    // Arrange
    const userId = 'user123'
    const createTaskDto = {
      title: 'Error Test Task',
      description: 'This is a test for errors'
    }

    mockDynamoDbClient.createTask.mockRejectedValue(new Error('DynamoDB error'))

    // Act & Assert
    await expect(
      createTaskAction.handle(userId, createTaskDto)
    ).rejects.toThrow('DynamoDB error')

    expect(mockDynamoDbClient.createTask).toHaveBeenCalledWith(userId, {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN
    })
  })
})
