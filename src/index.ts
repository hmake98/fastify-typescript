import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import Hooks from './plugins/hooks'
import userRouter from './routes/user'
export const prisma = new PrismaClient()

// Load env vars
import loadConfig from './config/config'
loadConfig()

export const createServer = async () => {
  const server = fastify({
    logger: { level: process.env.LOG_LEVEL },
  })

  // custom middleware, routes, hooks
  // check user router for how to use middleware function into api request

  // third party packages
  server.register(require('fastify-formbody'))
  server.register(require('fastify-cors'))
  server.register(require('fastify-file-upload'))
  server.register(require('fastify-helmet'))

  // API routers
  server.register(Hooks)
  server.register(userRouter, { prefix: '/api/user' })

  await server.ready()
  return server
}

export const startServer = async () => {
  const server = await createServer()

  await server.listen(process.env.API_PORT, process.env.API_HOST)

  prisma
    .$connect()
    .then(() => {
      server.log.info('Database connected')
    })
    .catch((err) => {
      server.log.error('Database connection failed')
      server.log.error(err)
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

  process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
  })
}

if (process.env.NODE_ENV !== 'test') {
  startServer()
}
