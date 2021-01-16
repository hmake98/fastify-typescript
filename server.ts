import Fastify, { FastifyInstance } from 'fastify'
import { serverConfig } from './src/config'
import now from 'fastify-now';
import * as path from 'path';

const app: FastifyInstance = Fastify({ logger: true })

const startServer = async () => {
    try {
        await app.listen(serverConfig.PORT)
        const address = app.server.address()
        const port = typeof address === 'string' ? address : address?.port
        app.register(now, {
            routesFolder: path.join(__dirname, './src/routes'),
        })
        await app.ready();
        app.log.info(`🚀 app listening on ${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

startServer();

export default app;