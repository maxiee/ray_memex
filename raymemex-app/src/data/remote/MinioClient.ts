import { Client } from 'minio';

const minioClient = new Client({
    endPoint: 'your-minio-endpoint',
    port: 9000,
    useSSL: false,
    accessKey: 'your-access-key',
    secretKey: 'your-secret-key',
});

export default minioClient;