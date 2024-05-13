// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: { body: string, requestContext: { authorizer: { claims: { sub: string}}} }): Promise<any> => {
  const userId = event.requestContext.authorizer.claims.sub;
  try {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: userId,
    };
}
catch (error) {
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: userId,
    };
}
};
