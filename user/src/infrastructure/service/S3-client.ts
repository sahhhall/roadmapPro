import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
dotenv.config();

// // for randomm image name suppose two user upload same s3 will overide old image 
// const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

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

    async uploadImageToBucket(fileBufferCode: Buffer, fileType: string, key: string) {
        const uploadParmas = {
            Bucket: this.bucketName,
            Body: fileBufferCode,
            Key: key,
            ContentType: fileType,
        }
        const data = await this.s3.send(new PutObjectCommand(uploadParmas));
        return data;
    }


    async getImageFromBucket(key: string) {
        let imageUrl = await getSignedUrl(
            this.s3,
            new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key
            }),
            { expiresIn: 300 }
        );
        return imageUrl;
    }

    async deleteImageFromBucket(key: string) {
        const deleteParams = {
            Bucket: this.bucketName,
            Key: key,
        };

        const data = await this.s3.send(new DeleteObjectCommand(deleteParams));
        return data;
    }

}



export  const s3Operation = new S3Operations();