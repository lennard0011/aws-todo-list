import { HandlerResponse } from "..";

export function getTasks(userId: string): HandlerResponse {
  console.log(`Getting tasks for user ${userId}`);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify([]),
  };
}
