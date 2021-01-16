import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Load env vars
import loadConfig from './config';
loadConfig();

export const createServer = async () => {
    const server = fastify({
        logger: { level: process.env.LOG_LEVEL },
    });

    server.register(require('./routes/index'))

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

    prisma.$connect().then(() => {
        console.log('Database connected')
    }).catch((err) => {
        console.error('Database connection failed!')
        console.log(err)
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
