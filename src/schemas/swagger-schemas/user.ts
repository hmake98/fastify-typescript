import { Type } from '@sinclair/typebox';

export const userSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  role: Type.String(),
  created_at: Type.Date(),
  updated_at: Type.Date(),
});

export const User = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
});

export const GetUserParams = Type.Object({
  id: Type.String(),
});
