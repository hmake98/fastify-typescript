import { Type } from '@sinclair/typebox';

export const errorResponseSchema = Type.Object({
  statusCode: Type.Number(),
  message: Type.String(),
});
