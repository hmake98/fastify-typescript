import { FastifyReply } from 'fastify';
import { IUserRequest } from '../interfaces';
import { prisma } from '../index';
import { ERRORS } from '../helpers/constants';
import * as JWT from 'jsonwebtoken'
import { utils } from '../helpers/utils';
import { reset } from 'nodemon';

export const login = async (request: IUserRequest, reply: FastifyReply) => {
    try {
        const {
            email,
            password,
        } = request.body

        const user = await prisma.user.findUnique({ where: { email: email } })

        if (!user) {
            console.error(ERRORS.userNotExists.message)
            return ERRORS.userNotExists;
        }

        const checkPass = await utils.compareHash(password, user.password)

        if (!checkPass) {
            console.error(ERRORS.userCredError.message)
            return ERRORS.userCredError;
        }

        const token = JWT.sign({
            id: user.id,
            email: user.email
        }, process.env.APP_JWT_SECRET);

        reply.code(200).send({
            token,
            user
        })
    } catch (err) {
        console.log(err)
        return new Error(err)
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
            console.error(ERRORS.userExists.message)
            return ERRORS.userExists;
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

        reply.code(200).send({
            token,
            user: createUser
        })
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

export const getAllUsers = async (request: IUserRequest, reply: FastifyReply) => {
    const data = await prisma.user.findMany({});
    reply.code(200).send({
        data
    })
}