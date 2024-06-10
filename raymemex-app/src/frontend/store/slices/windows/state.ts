import { AppTypeEnum } from "../../../../types/app/AppTypeEnum";
import { WindowType } from "../../../../types/wm/WindowType";
import { WindowViewStateEnum } from "../../../../types/wm/WindowViewStateEnum";

export const windowsInitalState = {
    elements: [{
        id: 1,
        title: "服务状态",
        appType: AppTypeEnum.ServiceStatus,
        hidden: false,
        width: "300px",
        height: "300px",
        top: 100,
        left: 100,
        zIndex: 1,
        viewState: WindowViewStateEnum.Custom,
        params: {}
    },] as WindowType[],
}