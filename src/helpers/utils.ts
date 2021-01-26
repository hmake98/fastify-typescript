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
        return new Promise((resolve, reject) => {
            bcrypt.hash(value, saltRounds, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
    },
    compareHash: (hash, value) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(value, hash, (err, result): boolean | any => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
}