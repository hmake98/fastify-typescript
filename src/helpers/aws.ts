import fs from 'fs'
import { s3 } from '../config/config'
import { utils } from './utils'
import { extname } from 'path'
import { IFile } from '../interfaces'

export const uploadFileToS3 = (file: IFile, path: string) => {
  return new Promise((resolve, reject) => {
    try {
      const extension = extname(file.originalFilename)
      const newFilename = `${utils.getTime()}${extension}`
      const newPath = path + newFilename
      const myBucket = process.env.BUCKET_NAME
      fs.readFile(file.path, (err, data) => {
        if (err) {
          reject(err)
        }
        const params = {
          Bucket: myBucket,
          Key: newPath,
          Body: data,
          ACL: 'public-read',
          ContentType: file.type,
        }
        s3.putObject(params, (error, result) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}
