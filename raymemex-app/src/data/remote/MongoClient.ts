import { ServiceStatus } from "./ServiceStatus";

export async function checkMongoStatus(): Promise<ServiceStatus> {
    // TODO: 实现真正的 MongoDB 连接状态检查
    return Math.random() < 0.5 ? 'online' : 'offline';
}