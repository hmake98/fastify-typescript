# Fastify-Typescript
Typescript based rest-API boilerplate with prisma and fastify framework.

## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`npm install`

### 2. Set up the database

This uses [Postgres database](https://www.postgresql.org/).

To set up your database, run:

```sh
npm run migrate
```

for production

```sh
npm run migrate:prod
```

### 3. Generate Prisma Client (type-safe database client)

Run the following command to generate [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/generating-prisma-client):

```sh
npm run db:gen
```

### 4. Start the Fastify server

Launch your Fastify server with this command:

```sh
npm run dev
```

## For Build Generation

Build server with command: 

```sh
npm run build
```

## Prisma documentation
- Check out the [Prisma docs](https://www.prisma.io/docs/)
- Check out the [Fastify docs](https://www.fastify.io/docs/latest/)
