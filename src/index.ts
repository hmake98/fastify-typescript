import { utils } from './helpers/utils';
import fastify from 'fastify'
import pino from 'pino';
import userRouter from './routes/user.router'
import postRouter from './routes/post.router';
import loadConfig from './config'
loadConfig()

const port = process.env.API_PORT || 5000;

const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: 'info' }),
    })
    server.register(require('fastify-formbody'))
    server.register(require('fastify-cors'))
    server.register(require('fastify-helmet'))
    server.register(userRouter, { prefix: '/api/user' })
    server.register(postRouter, { prefix: '/api/post' })
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error);
    })
    server.get('/', (request, reply) => {
      reply.send({ name: 'fastify-typescript' })
    })
    server.get('/health-check', async (request, reply) => {
      try {
        await utils.healthCheck()
        reply.status(200).send()
      } catch (e) {
        reply.status(500).send()
      }
    })
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`)
            process.exit(err ? 1 : 0)
          }),
        )
      }
    }
    await server.listen(port)
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()

