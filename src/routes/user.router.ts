import { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import { utils } from '../utils';
import { loginSchema, signupSchema } from '../schemas/User';
import { Type } from '@sinclair/typebox';

async function userRouter(app: FastifyInstance) {
  app.post(
    '/auth/login',
    {
      schema: {
        description: 'User login endpoint',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
        },
        tags: ['users'],
      },
      config: {
        swaggerTransform: false,
      },
      preValidation: utils.preValidation(loginSchema),
    },
    controllers.login,
  );

  app.post(
    '/auth/signup',
    {
      schema: {
        description: 'User signup endpoint',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
          },
        },
      },
      config: {
        swaggerTransform: false,
      },
      preValidation: utils.preValidation(signupSchema),
    },
    controllers.signUp,
  );

  app.get(
    '/users',
    {
      schema: {
        description: 'Get all users',
        summary: 'Get all users',
        tags: ['Users'],
        response: {
          200: Type.Array(
            Type.Object({
              id: Type.String(),
              name: Type.String(),
              email: Type.String({ format: 'email' }),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      return [
        { id: '1', name: 'Alice', email: 'alice@example.com' },
        { id: '2', name: 'Bob', email: 'bob@example.com' },
      ];
    },
  );

  app.post(
    '/users',
    {
      schema: {
        description: 'Create a new user',
        tags: ['Users'],
        body: Type.Object({
          name: Type.String({ minLength: 1 }),
          email: Type.String({ format: 'email' }),
        }),
        response: {
          201: Type.Object({
            id: Type.String(),
            name: Type.String(),
            email: Type.String({ format: 'email' }),
          }),
        },
      },
    },
    async (request, reply) => {
      const body = request.body as { name: string; email: string };
      return { id: '123', ...body };
    },
  );

  app.post(
    '/login/test',
    {
      schema: {
        description: 'Login and get JWT token',
        tags: ['Auth'],
        body: Type.Object({
          username: Type.String(),
          password: Type.String(),
        }),
        response: {
          200: Type.Object({
            token: Type.String(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { username, password } = request.body as any;

      // 🔥 You should validate against database here
      if (username === 'admin' && password === 'password') {
        // const token = app.jwt.sign({ username });
        return { token: 'token' };
      }

      reply.status(401).send({ message: 'Invalid credentials' });
    },
  );

  app.get(
    '/users/auth/test',
    {
      // preHandler: [app.authenticate], // ⬅️ Protect this route
      schema: {
        description: 'Get all users (Protected)',
        tags: ['Users'],
        security: [{ bearerAuth: [] }], // ⬅️ Tell Swagger this route needs JWT
        response: {
          200: Type.Array(
            Type.Object({
              id: Type.String(),
              name: Type.String(),
              email: Type.String({ format: 'email' }),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      return [
        { id: '1', name: 'Alice', email: 'alice@example.com' },
        { id: '2', name: 'Bob', email: 'bob@example.com' },
      ];
    },
  );
}

export default userRouter;
