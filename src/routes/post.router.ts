import { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import { checkValidRequest, checkValidUser } from '../helpers/auth.helper';
import { postCreateSchema } from '../schemas/Post';
import { utils } from '../utils';

async function postRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', null);

  fastify.post(
    '/create',
    {
      schema: {
        description: 'Create a new post',
        body: {
          type: 'object',
          properties: {
            content: { type: 'string' },
          },
          required: ['content'],
        },
      },
      preValidation: utils.preValidation(postCreateSchema),
      preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.createPost,
  );
}

export default postRouter;
