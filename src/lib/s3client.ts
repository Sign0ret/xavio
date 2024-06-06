import { S3 } from '@aws-sdk/client-s3';

export const endpoint: string = 'https://nyc3.digitaloceanspaces.com';

export const s3client: S3 = new S3({
    endpoint,
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY!,
        secretAccessKey: process.env.BUCKET_SECRET_KEY!
    }
});
