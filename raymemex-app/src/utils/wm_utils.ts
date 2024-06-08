import { WindowType } from "../types/wm/WindowType";

export const getWindowMaxId = (windows: WindowType[]) => {
    let maxId = 0;

    for (let window of windows) {
        if (window.id > maxId) {
            maxId = window.id;
        }
    }

    return maxId;
};

export const getMaxZIndex = (windows: WindowType[]) => {
    let maxZIndex = 0;

    for (let window of windows) {
        if (window.zIndex > maxZIndex) {
            maxZIndex = window.zIndex;
        }
    }

    return maxZIndex;
}