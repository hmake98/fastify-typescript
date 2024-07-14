import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';
import { IPostCreateDto } from '../schemas/Post';

export const createPost = async (
  request: FastifyRequest<{
    Body: IPostCreateDto;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request['authUser'];
    const { content } = request.body;
    const post = await prisma.post.create({
      data: {
        content,
        created_by: {
          connect: {
            id: id,
          },
        },
        view_count: 0,
      },
    });
    reply.status(STANDARD.OK.statusCode).send({ data: post });
  } catch (e) {
    handleServerError(reply, e);
  }
};
