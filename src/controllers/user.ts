import { FastifyReply } from 'fastify';
import { IUserRequest } from '../interfaces';
import { prisma } from '../index';
import { ERRORS } from '../helpers/constants';
import * as JWT from 'jsonwebtoken'
import { utils } from '../helpers/utils';
import { STANDARD } from '../helpers/response';
import { ERROR500 } from '../helpers/response';

export const login = async (request: IUserRequest, reply: FastifyReply) => {
    try {
        const {
            email,
            password,
        } = request.body

        const user = await prisma.user.findUnique({ where: { email: email } })

        if (!user) {
            reply
                .code(ERROR500.CODE)
                .send(ERRORS.userNotExists)
        }

        const checkPass = await utils.compareHash(password, user.password)

        if (!checkPass) {
            reply
                .code(ERROR500.CODE)
                .send(ERRORS.userCredError)
        }

        const token = JWT.sign({
            id: user.id,
            email: user.email
        }, process.env.APP_JWT_SECRET);

        reply.code(STANDARD.SUCCESS).send({
            token,
            user
        })
    } catch (err) {
        reply
            .code(ERROR500.CODE)
            .send(new Error(err))
    }
}

export const signUp = async (request: IUserRequest, reply: FastifyReply) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName
        } = request.body

        const user = await prisma.user.findUnique({ where: { email: email } })

        if (user) {
            reply
                .code(ERROR500.CODE)
                .send(ERRORS.userExists)
        }

        const hashPass = await utils.genSalt(10, password)

        const createUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: String(hashPass),
            }
        })

        const token = JWT.sign({
            id: createUser.id,
            email: createUser.email
        }, process.env.APP_JWT_SECRET);

        delete createUser.password

        reply.code(STANDARD.SUCCESS).send({
            token,
            user: createUser
        })
    } catch (err) {
        reply
            .code(ERROR500.CODE)
            .send(new Error(err))
    }
}

export const getAllUsers = async (request: IUserRequest, reply: FastifyReply) => {
    try {
        const data = await prisma.user.findMany({});

        reply.code(STANDARD.SUCCESS).send({
            data
        })
    } catch (err) {
        reply
            .code(ERROR500.CODE)
            .send(new Error(err))
    }
}