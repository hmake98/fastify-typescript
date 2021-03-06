import fs from 'fs'
import { S3 } from 'aws-sdk'
import { awsConfig } from '../config/config'
import { utils } from './utils'
import { extname } from 'path'
import { IFile } from '../interfaces';

const s3 = new S3({
    accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsConfig.AWS_SECRET_KEY,
    region: awsConfig.AWS_REGION
});

export const uploadFileToS3 = (file: IFile, path: string) => {
    return new Promise((resolve, reject) => {
        try {
            const extension = extname(file.originalFilename);
            const newFilename = `${utils.getTime()}${extension}`;
            const newPath = path + newFilename;
            const myBucket = process.env.BUCKET_NAME;
            fs.readFile(file.path, (err, data) => {
                if (err) {
                    reject(err);
                }
                const params = {
                    Bucket: myBucket,
                    Key: newPath,
                    Body: data,
                    ACL: 'public-read',
                    ContentType: file.type,
                };
                s3.putObject(params, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}
