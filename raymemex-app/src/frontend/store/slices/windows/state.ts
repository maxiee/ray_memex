import { AppTypeEnum } from "../../../../types/app/AppTypeEnum";
import { WindowType } from "../../../../types/wm/WindowType";
import { WindowViewStateEnum } from "../../../../types/wm/WindowViewStateEnum";

export const windowsInitalState = {
    elements: [{
        id: 1,
        appType: AppTypeEnum.WebBrowser,
        hidden: false,
        width: "60%",
        height: "300px",
        top: 100,
        left: 100,
        zIndex: 1,
        viewState: WindowViewStateEnum.Custom,
        params: {}
    },] as WindowType[],
}