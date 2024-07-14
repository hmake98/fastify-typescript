export const STANDARD = {
  OK: {
    message: 'OK',
    statusCode: 200,
  },
  CREATED: {
    message: 'Created',
    statusCode: 201,
  },
  ACCEPTED: {
    message: 'Accepted',
    statusCode: 202,
  },
  NO_CONTENT: {
    message: 'No Content',
    statusCode: 204,
  },
  RESET_CONTENT: {
    message: 'Reset Content',
    statusCode: 205,
  },
  PARTIAL_CONTENT: {
    message: 'Partial Content',
    statusCode: 206,
  },
} as const;
