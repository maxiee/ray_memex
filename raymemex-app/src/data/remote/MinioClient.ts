import AWS from 'aws-sdk';
import { ServiceStatus } from './ServiceStatus';

const minioEndpoint = process.env.MINIO_ENDPOINT;
const minioAccessKey = process.env.MINIO_ACCESS_KEY;
const minioSecretKey = process.env.MINIO_SECRET_KEY;

if (!minioEndpoint || !minioAccessKey || !minioSecretKey) {
    throw new Error('MinIO configuration not found in environment variables');
}

const s3Client = new AWS.S3({
    endpoint: minioEndpoint,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    accessKeyId: minioAccessKey,
    secretAccessKey: minioSecretKey,
});

export async function checkMinioStatus(): Promise<ServiceStatus> {
    try {
        await s3Client.listBuckets().promise();
        return 'online';
    } catch (error) {
        console.error('MinIO connection error:', error);
        return 'offline';
    }
}

export default s3Client;