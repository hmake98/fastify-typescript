import { IUserController } from '../interfaces'

export const userController: IUserController = {
    async login(request, response): Promise<any> {
        try {
            console.log('login')
        } catch (err) {
            console.log(err)
        }
    },
    async signUp(request, reponse): Promise<any> {
        try {
            console.log('signup')
        } catch (err) {
            console.log(err)
        }   
    }
}