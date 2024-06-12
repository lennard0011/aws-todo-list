import { HandlerResponse } from "..";

type TaskDto = {
  title: string;
  description: string;
};

export function createTask(userId: string, taskDto: TaskDto): HandlerResponse {
  console.log(`Creating task for user ${userId}`);
  console.log(`Task: ${JSON.stringify(taskDto)}`);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
}
