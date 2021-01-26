import fastify from 'fastify'
import mongoose from 'mongoose'

// Load env vars
import loadConfig from './config';
loadConfig();

export const createServer = async () => {
    const server = fastify({
        logger: { level: process.env.LOG_LEVEL },
    });

    // custom middleware, routes, hooks
    // check user router for how to use middleware function into api request
    server.register(require('./routes/userRouter'))

    // third party packages
    server.register(require('fastify-formbody'))
    server.register(require('fastify-cors'))
    server.register(require('fastify-file-upload'))
    server.register(require('fastify-helmet'))

    await server.ready();
    return server;
}

export const startServer = async () => {
    process.on('unhandledRejection', (err) => {
        console.error(err);
        process.exit(1);
    });

    const server = await createServer();

    await server.listen(process.env.API_PORT, process.env.API_HOST);


    mongoose.set('debug', false)
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        server.log.info('Mongodb server connected!')
    }).catch((err) => {
        server.log.error(err)
    })

    if (process.env.NODE_ENV === 'production') {
        for (const signal of ['SIGINT', 'SIGTERM']) {
            process.on(signal, () =>
                server.close().then((err) => {
                    console.log(`close application on ${signal}`);
                    process.exit(err ? 1 : 0);
                }),
            );
        }
    }
}

if (process.env.NODE_ENV !== 'test') {
    startServer();
}
