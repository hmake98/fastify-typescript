import * as JWT from 'jsonwebtoken'
import { prisma } from '../index'
import { FastifyRequest, FastifyReply } from 'fastify';
import { ERROR400, ERROR401, ERROR500 } from '../helpers/errors';
import { IUserRequest } from 'interfaces/iuser';

export const checkValidRequest = async (req: FastifyRequest, res: FastifyReply, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            JWT.verify(token, process.env.APP_JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.send(ERROR401)
                }
                return next()
            })
        } else {
            return res.send(ERROR400)
        }
    } catch (err) {
        ERROR500.MESSAGE = err;
        return res.send(ERROR500)
    }
}

export const checkValidUser = async (req: IUserRequest, res: FastifyReply, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.send(ERROR401)
        }
        const user: any = JWT.verify(token, process.env.APP_JWT_SECRET);

        if (!user.id) {
            return res.send(ERROR401)
        }

        const userData = await prisma.user.findUnique({ where: { id: user.id } })
        if (!userData) {
            return res.send(ERROR401)
        }

        req.authUser = userData

        next();
    } catch (err) {
        ERROR500.MESSAGE = err;
        return res.send(ERROR500)
    }
}

