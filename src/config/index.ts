export const serverConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_SECRET: process.env.APP_SECRET
}

export const databaseConfig = {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD
}

export const awsConfig = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION
}