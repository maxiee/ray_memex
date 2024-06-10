import React, { useEffect, useState } from 'react';
import { Service } from '../../data/remote/ServiceStatus';
import { checkMinioStatus } from '../../renderer';
import { List, Tag } from 'antd';
import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow } from 'react95';

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

        // Immediately call checkStatuses
        checkStatuses();

        const intervalId = setInterval(checkStatuses, 30000);
        return () => {
            clearInterval(intervalId);
        };
    }, [serviceStatuses]);

    return <Table>
        <TableHead>
            <TableRow>
                <TableHeadCell>服务</TableHeadCell>
                <TableHeadCell>状态</TableHeadCell>
            </TableRow>

        </TableHead>
        <TableBody>
            {serviceStatuses.map((service) => (
                <TableRow key={service.name}>
                    <TableDataCell>{service.name}</TableDataCell>
                    <TableDataCell>
                                <Tag color={service.status === 'online' ? 'green' : 'red'}>
                                    {service.status}
                                </Tag>
                    </TableDataCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>

    // return (
    //     <div>
    //         <h2>Service Status</h2>
    //         <List
    //             bordered
    //             dataSource={serviceStatuses}
    //             renderItem={(service) => (
    //                 <List.Item>
    //                     <List.Item.Meta
    //                         title={service.name}
    //                         description={
    //                             <Tag color={service.status === 'online' ? 'green' : 'red'}>
    //                                 {service.status}
    //                             </Tag>
    //                         }
    //                     />
    //                 </List.Item>
    //             )}
    //         />
    //     </div>
    // );
};

export default ServiceStatusDisplay;