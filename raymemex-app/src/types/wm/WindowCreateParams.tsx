import { AppTypeEnum } from "../app/AppTypeEnum";

export type WindowCreateParams = {
    name: string;
    app: AppTypeEnum;
    params?: any;
};