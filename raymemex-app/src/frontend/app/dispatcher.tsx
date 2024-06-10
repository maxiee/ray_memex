import { AppTypeEnum } from "src/types/app/AppTypeEnum";

export const appDispatcher = (appType: AppTypeEnum) => {
    return <div>appType={appType}</div>
}