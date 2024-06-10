import { AppTypeEnum } from "../app/AppTypeEnum";
import { WindowViewStateEnum } from "./WindowViewStateEnum";

export type WindowType = {
    id: number;
    title: string;
    appType: AppTypeEnum;
    hidden: boolean;
    width: string;
    height: string;
    top: number;
    left: number;
    zIndex: number;
    viewState: WindowViewStateEnum;
    params: any;
}