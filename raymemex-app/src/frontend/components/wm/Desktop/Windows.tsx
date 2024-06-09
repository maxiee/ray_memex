import { useSelector } from "react-redux"
import { selectWindows } from "../../../../frontend/store/slices/windows/selectors"
import { WindowStyle } from "./style";
import { WindowFrame } from "../WindowFrame/WindowFrame";

export const Windows = () => {
    const windows = useSelector(selectWindows);

    return <WindowStyle>
        {
            windows?.elements?.length && windows.elements.map((window) =>
                <WindowFrame key={window.id} window={window}><span>React95</span></WindowFrame>
            )
        }
    </WindowStyle>
}