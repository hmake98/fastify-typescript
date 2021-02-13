import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../index'
import { ERROR400, ERROR401, ERROR500 } from './response';
import { IUserRequest } from 'interfaces';
import * as JWT from 'jsonwebtoken'

export const checkValidRequest = async (request: FastifyRequest, reply: FastifyReply, next) => {
    try {
        let token = request.headers.authorization
        token = token.replace('Bearer ', '');

        if (token) {
            JWT.verify(token, process.env.APP_JWT_SECRET, (err, decoded) => {
                if (err) {
                    return reply
                        .code(ERROR401.CODE)
                        .send(ERROR401)
                }
                next()
            })
        } else {
            return reply
                .code(ERROR400.CODE)
                .send(ERROR400)
        }
    } catch (err) {
        return reply
            .code(ERROR500.CODE)
            .send(ERROR500)
    }
}

export const checkValidUser = async (request: IUserRequest, reply: FastifyReply, next) => {
    try {
        let token = request.headers.authorization;
        token = token.replace('Bearer ', '');

        if (!token) {
            return reply
                .code(ERROR401.CODE)
                .send(ERROR401)
        }

        const user: any = JWT.verify(token, process.env.APP_JWT_SECRET);

        if (!user.id) {
            return reply
                .code(ERROR401.CODE)
                .send(ERROR401)
        }

        const userData = await prisma.user.findUnique({ where: { id: user.id } })

        if (!userData) {
            return reply
                .code(ERROR401.CODE)
                .send(ERROR401)
        }

        request.authUser = userData

        next();
    } catch (err) {
        return reply
            .code(ERROR500.CODE)
            .send(ERROR500)
    }
}

