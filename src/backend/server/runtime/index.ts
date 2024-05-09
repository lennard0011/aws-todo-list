export const handler = async (event: { body: string; }): Promise<any> => {
    try {
        const body = JSON.parse(event.body);
        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};