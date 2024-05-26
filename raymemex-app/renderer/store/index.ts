import { createStore } from 'redux';
import { UPDATE_LAYOUT, ADD_TAB, REMOVE_TAB, SET_ACTIVE_TAB, ADD_WINDOW } from './actions';

const initialState: AppState = {
    frames: [{
        id: 'frame-1',
        title: 'Frame 1',
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        windows: [],
    }],
};

function reducer(state = initialState, action: any): AppState {
    switch (action.type) {
        case UPDATE_LAYOUT:
            const { frameId, windowId, layout } = action.payload;
            return {
                ...state,
                frames: state.frames.map((frame) => {
                    if (frame.id === frameId) {
                        return {
                            ...frame,
                            windows: frame.windows.map((window) => {
                                if (window.id === windowId) {
                                    return {
                                        ...window,
                                        ...layout.find((l) => l.i === windowId),
                                    };
                                }
                                return window;
                            }),
                        };
                    }
                    return frame;
                }),
            };
        case ADD_WINDOW:
            return {
                ...state,
                frames: state.frames.map((frame) => {
                    if (frame.id === action.payload.frameId) {
                        return {
                            ...frame,
                            windows: [...frame.windows, action.payload.window],
                        };
                    }
                    return frame;
                }),
            };
        case ADD_TAB:
            return {
                ...state,
                frames: state.frames.map((frame) => {
                    if (frame.id === action.payload.frameId) {
                        return {
                            ...frame,
                            windows: frame.windows.map((window) => {
                                if (window.id === action.payload.windowId) {
                                    return {
                                        ...window,
                                        tabs: [...window.tabs, action.payload.tab],
                                    };
                                }
                                return window;
                            }),
                        };
                    }
                    return frame;
                }),
            };
        case REMOVE_TAB:
            return {
                ...state,
                frames: state.frames.map((frame) => {
                    if (frame.id === action.payload.frameId) {
                        return {
                            ...frame,
                            windows: frame.windows.map((window) => {
                                if (window.id === action.payload.windowId) {
                                    return {
                                        ...window,
                                        tabs: window.tabs.filter((tab) => tab.id !== action.payload.tabId),
                                    };
                                }
                                return window;
                            }),
                        };
                    }
                    return frame;
                }),
            };
        case SET_ACTIVE_TAB:
            return {
                ...state,
                frames: state.frames.map((frame) => {
                    if (frame.id === action.payload.frameId) {
                        return {
                            ...frame,
                            windows: frame.windows.map((window) => {
                                if (window.id === action.payload.windowId) {
                                    return {
                                        ...window,
                                        tabs: window.tabs.map((tab) => {
                                            return {
                                                ...tab,
                                                active: tab.id === action.payload.tabId,
                                            };
                                        }),
                                    };
                                }
                                return window;
                            }),
                        };
                    }
                    return frame;
                }),
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;