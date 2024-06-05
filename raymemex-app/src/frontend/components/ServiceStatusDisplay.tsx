import React, { useEffect, useState } from 'react';
import { Service } from '../../data/remote/ServiceStatus';
import { checkMinioStatus } from '../../renderer';

const services: Service[] = [
    {
        name: 'MinIO',
        status: 'checking',
        checkStatus: checkMinioStatus,
    },
];

const ServiceStatusDisplay: React.FC = () => {
    const [serviceStatuses, setServiceStatuses] = useState<Service[]>(services);
    useEffect(() => {
        const checkStatuses = async () => {
            const statuses = await Promise.all(
                serviceStatuses.map(async (service) => ({
                    ...service,
                    status: await service.checkStatus(),
                }))
            );
            setServiceStatuses(statuses);
        };
        const intervalId = setInterval(checkStatuses, 30000);
        return () => {
            clearInterval(intervalId);
        };
    }, [serviceStatuses]);
    return (
        <div>
            <h2>Service Status</h2>
            <ul>
                {serviceStatuses.map((service) => (
                    <li key={service.name}>
                        {service.name}: {service.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ServiceStatusDisplay;