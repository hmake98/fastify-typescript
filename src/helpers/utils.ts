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
    }
}