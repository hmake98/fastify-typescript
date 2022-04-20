import { FastifyReply, FastifyRequest } from "fastify"
import { STANDARD } from "../helpers/constants"
import { handleServerError } from "../helpers/errors"
import { prisma } from "../helpers/utils"

export const createPost = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id, email } = request['authUser']
        const post = await prisma.post.create({
            data: {
                content: request.body['content'],
                createdBy: {
                    connect: {
                        id: id,
                    }
                },
                viewCount: 0,
            }
        })
        reply.status(STANDARD.SUCCESS).send({ data: post })
    } catch (e) {
        handleServerError(reply, e)
    }
}