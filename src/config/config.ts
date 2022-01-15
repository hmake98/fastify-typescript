import path from 'path'
import envSchema from 'env-schema'
import S from 'fluent-json-schema'
import { S3 } from 'aws-sdk'

export const awsConfig = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_REGION: process.env.AWS_REGION,
}

export const s3 = new S3({
  accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsConfig.AWS_SECRET_KEY,
  region: awsConfig.AWS_REGION,
})

export default function loadConfig(): void {
  const result = require('dotenv').config({
    path: path.join(
      __dirname,
      `../../${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '.development'
      }.env`,
    ),
  })

  if (result.error) {
    throw new Error(result.error)
  }

  envSchema({
    data: result.parsed,
    schema: S.object()
      .prop(
        'NODE_ENV',
        S.string().enum(['development', 'testing', 'production']).required(),
      )
      .prop('API_HOST', S.string().required())
      .prop('API_PORT', S.string().required())
      .prop('DATABASE_URL', S.string().required())
      .prop('APP_JWT_SECRET', S.string().required()),
  })
}
