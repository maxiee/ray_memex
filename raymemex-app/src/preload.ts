// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import s3Client from "./data/remote/MinioClient";

console.log('Hello from preload script!');

s3Client.listBuckets((err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});