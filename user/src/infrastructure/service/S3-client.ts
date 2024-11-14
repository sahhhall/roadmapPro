import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config();

// for randomm image name suppose two user upload same s3 will overide old image 
const randomImageName = (bytes=32) => crypto.randomBytes(bytes).toString('hex')

class S3Operations {
    private s3: S3Client;
    private bucketName: string;

    constructor() {
        const secretKey = process.env.SECRET_ACCESS_KEY as string;
        const accessKey = process.env.ACCESS_KEY as string;
        const bucketRegion = process.env.BUCKET_REGION as string;
        this.bucketName = process.env.BUCKET_NAME as string;

        this.s3 = new S3Client({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            },
            region: bucketRegion
        });
    }


}



export default new S3Operations();