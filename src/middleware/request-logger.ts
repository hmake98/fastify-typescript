export async function requestLogger(
  request: {
    method: string;
    url: string;
    headers: Record<string, string | string[]>;
  },
  reply: { statusCode: number },
): Promise<void> {
  const { method, url, headers } = request;
  const { statusCode } = reply;

  // Log the request details
  console.log(`${new Date().toISOString()} - ${method} ${url} - ${statusCode}`);

  // Log the headers if needed (be cautious with sensitive information)
  console.log('Headers:', headers);

  return Promise.resolve();
}
