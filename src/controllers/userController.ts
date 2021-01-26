import { FastifyReply } from 'fastify';
import { IUserRequest } from '../interfaces/iuser';
import { ERRORS } from '../helpers/constants';
import * as JWT from 'jsonwebtoken'
import { utils } from '../helpers/utils';
import User from './../models/User';

export const login = async (req: IUserRequest, res: FastifyReply) => {
    try {
        const {
            email,
            password,
        } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            res
            console.error(ERRORS.userNotExists.message)
            return ERRORS.userNotExists;
        }

        if (!utils.compareHash(password, user.password)) {
            console.error(ERRORS.userCredError.message)
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
        console.log(err)
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

        const user = await User.findOne({ email })

        if (user) {
            console.error(ERRORS.userExists.message)
            return ERRORS.userExists;
        }

        const hashPass = await utils.genSalt(10, password)

        const createUser = await User.create({
            email,
            firstName,
            lastName,
            password: String(hashPass),
        })

        const token = JWT.sign({
            id: createUser.id,
            email: createUser.email
        }, process.env.APP_JWT_SECRET);

        delete createUser.password

        return {
            token,
            user: createUser
        }
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}