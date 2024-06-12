import { createTask } from "./task/create-task";
import { getTasks } from "./task/get-task";

type HandlerInput = {
  path: string;
  httpMethod: string;
  body: string;
  requestContext: {
    authorizer: {
      claims: {
        sub: string;
      };
    };
  };
};

export type HandlerResponse = {
  statusCode: number;
  headers: { "Access-Control-Allow-Origin": string };
  body?: unknown;
};

const notFoundResponse = {
  statusCode: 404,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  body: "Not Found",
};

export const handler = async (
  event: HandlerInput,
): Promise<HandlerResponse> => {
  const userId = event.requestContext.authorizer.claims.sub;

  const path = event.path;
  const method = event.httpMethod;
  const body = JSON.parse(event.body);

  switch (path) {
    case "/task":
      switch (method) {
        case "POST":
          return createTask(userId, body);
        case "GET":
          return getTasks(userId);
      }
  }
  
  return notFoundResponse;
};
