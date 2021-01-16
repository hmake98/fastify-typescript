import fastify from 'fastify';
import path from 'path';

// Load env vars
import loadConfig from './config';
loadConfig();

export const createServer = async () => {
    const server = fastify({
        logger: { level: process.env.LOG_LEVEL },
    });

    server.register(require('fastify-autoload'), {
        dir: path.join(__dirname, './routes')
    })

    server.register(require('fastify-jwt'), {
        secret: process.env.APP_JWT_SECRET
    })

    server.register(require('fastify-multipart'), {
        limits: {
            fieldNameSize: 100, // Max field name size in bytes
            fieldSize: 1000000, // Max field value size in bytes
            fields: 10,         // Max number of non-file fields
            fileSize: 100,      // For multipart forms, the max file size
            files: 1,           // Max number of file fields
            headerPairs: 2000   // Max number of header key=>value pairs
        }
    })

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
