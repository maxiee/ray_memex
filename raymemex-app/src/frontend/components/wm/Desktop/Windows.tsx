import { useSelector } from "react-redux"
import { selectWindows } from "../../../../frontend/store/slices/windows/selectors"
import { WindowStyle } from "./style";
import { WindowFrame } from "../WindowFrame/WindowFrame";
import { Monitor } from "react95";

export const Windows = () => {
    const windows = useSelector(selectWindows);

    return <WindowStyle>
        {
            windows?.elements?.length && windows.elements.map((window) => <div>
                <WindowFrame key={window.id} window={window}><span>React95</span></WindowFrame>
            </div>)
        }
    </WindowStyle>
}