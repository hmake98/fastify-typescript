export const login = async (req, res) => {
    try {
        return { message: 'Hello world!' }
    } catch (err) {
        console.log(err)
    }
}

export const signUp = async (req, res) => {
    try {
        return { message: 'Signup world!' }
    } catch (err) {
        console.log(err)
    }
}