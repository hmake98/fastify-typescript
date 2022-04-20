import { IGetPresign, IPutPresign } from '../interfaces'
import { S3 } from 'aws-sdk'
import { awsBucketName, awsConfig, linkExpireTime } from 'config'

const s3 = new S3({
  accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsConfig.AWS_SECRET_KEY,
  region: awsConfig.AWS_REGION,
})

export const getPresginUrl = async (data: IGetPresign) => {
  return await s3.getSignedUrlPromise('getObject', {
    Bucket: awsBucketName,
    Key: data.fileName,
    Expires: linkExpireTime,
  })
}

export const putPresginUrl = async (data: IPutPresign) => {
  const { userId, fileName } = data
  return await s3.getSignedUrlPromise('putObject', {
    Bucket: awsBucketName,
    Key: `${Date.now()}_${userId}_${fileName}`,
    Expires: linkExpireTime,
  })
}
