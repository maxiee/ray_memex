
import { windowsInitalState } from "./state";
import { ADD_WINDOW, DELETE_WINDOW, SET_WINODW_TOP, UPDATE_VIEW_STATE, UPDATE_WINDOW_HEIGHT, UPDATE_WINDOW_LEFT, UPDATE_WINDOW_TOP, UPDATE_WINDOW_VISIBILITY, UPDATE_WINDOW_WIDTH } from "./constants";
import { getMaxZIndex, getWindowMaxId } from "../../../../utils/wm_utils";
import { AnyAction } from "@reduxjs/toolkit";
import { WindowType } from "src/types/wm/WindowType";
import { WindowViewStateEnum } from "../../../../types/wm/WindowViewStateEnum";

export const windowReducer = (
    state = windowsInitalState,
    action: AnyAction
) => {
    let elements = [];

    switch (action.type) {
        case ADD_WINDOW:
            const id = getWindowMaxId(state.elements) + 1;
            const zIndex = getMaxZIndex(state.elements) + 1;
            const appType = action.payload.params.type;

            const newWindow: WindowType = {
                id,
                appType,
                hidden: false,
                width: "100%",
                height: "100vh",
                top: 0,
                left: 0,
                zIndex,
                viewState: WindowViewStateEnum.Fullscreen,
                params: action.payload.params
            };

            return {
                ...state,
                elements: [...state.elements, newWindow]
            };

        case DELETE_WINDOW:
            elements = [];

            for (let element of state.elements) {
                if (element.id !== action.payload.windowId) {
                    elements.push(element);
                }
            }

            return {
                ...state,
                elements: [...elements]
            };

        case UPDATE_WINDOW_VISIBILITY:
            elements = [];

            for (let element of state.elements) {
                if (element.id === action.payload.windowId) {
                    elements.push({ ...element, hidden: !element.hidden });
                } else {
                    elements.push(element);
                }
            }

            return {
                ...state,
                elements: elements
            };

        case SET_WINODW_TOP:
            const maxZ = state.elements.length;
            const window = state.elements.filter((element) => element.id === action.payload.windowId)[0];

            if (!window) {
                return state;
            }

            elements = [];
            for (let element of state.elements) {
                let newZ = element.zIndex;

                if (element.id === window.id) {
                    newZ = maxZ;
                }

                if (element.zIndex > window.zIndex) {
                    newZ = element.zIndex - 1;
                }

                elements.push({ ...element, zIndex: newZ });
            }

            return {
                ...state,
                elements: elements
            };

        case UPDATE_WINDOW_WIDTH:
            const newWidth = `${action.payload.width}%`;
            elements = [];

            for (let element of state.elements) {
                if (element.id === action.payload.windowId) {
                    elements.push({ ...element, width: newWidth });
                } else {
                    elements.push(element);
                }
            }
            return { ...state, elements: elements };

        case UPDATE_WINDOW_HEIGHT:
            const newHeight = `${action.payload.height}vh`;
            elements = [];

            for (let element of state.elements) {
                if (element.id === action.payload.windowId) {
                    elements.push({ ...element, height: newHeight });
                } else {
                    elements.push(element);
                }
            }
            return { ...state, elements: elements };

        case UPDATE_WINDOW_TOP:
            const newTop = action.payload.top;
            elements = [];

            for (let element of state.elements) {
                if (element.id === action.payload.windowId) {
                    elements.push({ ...element, top: newTop });
                } else {
                    elements.push(element);
                }
            }
            return { ...state, elements };

        case UPDATE_WINDOW_LEFT:
            const newLeft = action.payload.left;
            elements = [];

            for (let element of state.elements) {
                if (element.id === action.payload.windowId) {
                    elements.push({ ...element, left: newLeft });
                } else {
                    elements.push(element);
                }
            }
            return { ...state, elements };

        case UPDATE_VIEW_STATE:
            elements = [];
            for (let element of state.elements) {
                if (element.id === action.payload.windowId) {
                    elements.push({ ...element, viewState: action.payload.viewState });
                } else {
                    elements.push(element);
                }
            }
            return { ...state, elements };

        default:
            return state;

    }
}