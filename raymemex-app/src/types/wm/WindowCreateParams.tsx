import { AppTypeEnum } from "../app/AppTypeEnum";

export type WindowCreateParams = {
    id: number;
    name: string;
    app: AppTypeEnum;
    params?: any;
};