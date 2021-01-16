export interface IUserController {
    login(request, response): Promise<any>

    signUp(request, response): Promise<any>
}