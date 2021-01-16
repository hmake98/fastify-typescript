import fastify, { FastifyReply } from 'fastify';
import { IUserRequest } from '../interface/iuser';
import { logger, prisma } from '../index';
import { ERRORS } from '../helpers/errors';
import * as JWT from 'jsonwebtoken'
import { utils } from 'helpers/utils';

export const login = async (req: IUserRequest, res: FastifyReply) => {
    try {
        const {
            email,
            password,
        } = req.body

        const user = await prisma.user.findUnique({ where: { email: email } })

        if (!user) {
            logger.error(ERRORS.userNotExists.message)
            return ERRORS.userNotExists;
        }

        if (!utils.compareHash(password, user.password)) {
            logger.error(ERRORS.userCredError.message)
            return ERRORS.userCredError;
        }

        const token = JWT.sign({
            id: user.id,
            email: user.email
        }, process.env.APP_JWT_SECRET);

        return {
            token,
            user
        }
    } catch (err) {
        logger.error(err)
        return new Error(err)
    }
}

export const signUp = async (req: IUserRequest, res: FastifyReply) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName
        } = req.body

        const user = await prisma.user.findUnique({ where: { email: email } })

        if (user) {
            logger.error(ERRORS.userExists.message)
            return ERRORS.userExists;
        }

        const hashPass = String(utils.genSalt(10, password))

        const createUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashPass,
            }
        })

        const token = JWT.sign({
            id: createUser.id,
            email: createUser.email
        }, process.env.APP_JWT_SECRET);

        return {
            token,
            user: createUser
        }
    } catch (err) {
        logger.error(err)
        return new Error(err)
    }
}