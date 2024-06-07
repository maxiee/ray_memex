import { WindowViewStateEnum } from "../../../../types/wm/WindowViewStateEnum";
import { WindowCreateParams } from "../../../../types/wm/WindowCreateParams";
import { ADD_WINDOW, DELETE_WINDOW, SET_WINODW_TOP, UPDATE_VIEW_STATE, UPDATE_WINDOW_HEIGHT, UPDATE_WINDOW_LEFT, UPDATE_WINDOW_TOP, UPDATE_WINDOW_VISIBILITY, UPDATE_WINDOW_WIDTH } from "./constants";

export const deleteWindow = (windowId: number) => ({
    type: DELETE_WINDOW,
    payload: { windowId }
});

export const addWindow = (params: WindowCreateParams) => ({
    type: ADD_WINDOW,
    payload: { params }
});

export const updateWindowVisibility = (windowId: number) => ({
    type: UPDATE_WINDOW_VISIBILITY,
    payload: { windowId }
});

export const setWindowTop = (windowId: number) => ({
    type: SET_WINODW_TOP,
    payload: { windowId }
});

export const updateWidth = (windowId: number, width: number) => ({
    type: UPDATE_WINDOW_WIDTH,
    payload: { windowId, width }
});

export const updateHeight = (windowId: number, height: number) => ({
    type: UPDATE_WINDOW_HEIGHT,
    payload: { windowId, height }
});

export const updateTop = (windowId: number, top: number) => ({
    type: UPDATE_WINDOW_TOP,
    payload: { windowId, top }
});

export const updateLeft = (windowId: number, left: number) => ({
    type: UPDATE_WINDOW_LEFT,
    payload: { windowId, left }
});

export const updateViewState = (windowId: number, state: WindowViewStateEnum) => ({
    type: UPDATE_VIEW_STATE,
    payload: { windowId, state }
});
