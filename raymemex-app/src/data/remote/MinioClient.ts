import AWS from 'aws-sdk';

const s3Client = new AWS.S3({
    endpoint: 'your-minio-endpoint',
    s3ForcePathStyle: true, // 必须设置,否则会报错
    signatureVersion: 'v4',
    accessKeyId: 'your-access-key',
    secretAccessKey: 'your-secret-key'
});

export default s3Client;