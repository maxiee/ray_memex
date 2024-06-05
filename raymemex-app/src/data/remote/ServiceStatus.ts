export type ServiceStatus = 'online' | 'offline' | 'checking';
export type Service = {
    name: string;
    status: ServiceStatus;
    checkStatus: () => Promise<ServiceStatus>;
};