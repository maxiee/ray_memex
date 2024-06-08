import { Windows } from "./Windows";
import { DesktopStyle } from "./style";

export const Desktop = () => {
    return <DesktopStyle>
        <Windows />
    </DesktopStyle>;
};