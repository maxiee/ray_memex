import { AppTypeEnum } from "../../types/app/AppTypeEnum";
import ServiceStatusDisplay from "../components/ServiceStatusDisplay";

export const appDispatcher = (appType: AppTypeEnum) => {
    switch (appType) {
        // case AppTypeEnum.WebBrowser:
        //     return <WebBrowser />;
        // case AppTypeEnum.ImageViewer:
        //     return <ImageViewer />;
        case AppTypeEnum.ServiceStatus:
            return <ServiceStatusDisplay />;
        default:
            return <div>appType={appType}</div>;
    }
}