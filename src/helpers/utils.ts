import * as bcrypt from 'bcrypt'

export const utils = {
    isJSON: (data: string) => {
        try {
            JSON.parse(data)
        } catch (e) {
            return false
        }
        return true
    },
    getTime: () => {
        const date = new Date()
        const time = date.getTime()
        return time
    },
    genSalt: (saltRounds, value) => {
        bcrypt.hash(value, saltRounds, (err, hash): string => {
            if (err) return err
            else return hash
        })
    },
    compareHash: (hash, value) => {
        let response: boolean
        bcrypt.compare(value, hash, (err, result): boolean => {
            if (err) return err
            response = result
        })
        return response
    }
}