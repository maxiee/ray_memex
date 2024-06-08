import { useSelector } from "react-redux"
import { selectWindows } from "../../../../frontend/store/slices/windows/selectors"
import { WindowStyle } from "./style";

export const Windows = () => {
    const windows = useSelector(selectWindows);

    return <WindowStyle>
        {
            windows?.elements?.length && windows.elements.map((window) => <div>
                {window.id}
            </div>)
        }
    </WindowStyle>
}