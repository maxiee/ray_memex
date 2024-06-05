// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IpcChannelType } from "./IpcChannelType";

console.log('Hello from preload script!');

// s3Client.listBuckets((err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });


export class ContextBridgeAPI {
    public static readonly API_KEY = "api";

    public checkMinioStatus = () => {
        return ipcRenderer.invoke(IpcChannelType.TO_MAIN, {
            type: 'check-minio-status',
        }).then((status: string) => {
            console.log('MinIO status:', status);
            return status;
        }).catch((error) => console.error(error));
    }
}

contextBridge.exposeInMainWorld(
    ContextBridgeAPI.API_KEY,
    new ContextBridgeAPI()
);