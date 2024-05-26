export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const ADD_WINDOW = 'ADD_WINDOW';
export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export function updateLayout(frameId: string, windowId: string, layout: Layout[]) {
    return {
        type: UPDATE_LAYOUT,
        payload: { frameId, windowId, layout },
    };
}

export function addWindow(frameId: string, window: Window) {
    return {
        type: ADD_WINDOW,
        payload: { frameId, window },
    };
}

export function addTab(frameId: string, windowId: string, tab: Tab) {
    return {
        type: ADD_TAB,
        payload: { frameId, windowId, tab },
    };
}

export function removeTab(frameId: string, windowId: string, tabId: string) {
    return {
        type: REMOVE_TAB,
        payload: { frameId, windowId, tabId },
    };
}

export function setActiveTab(frameId: string, windowId: string, tabId: string) {
    return {
        type: SET_ACTIVE_TAB,
        payload: { frameId, windowId, tabId },
    };
}