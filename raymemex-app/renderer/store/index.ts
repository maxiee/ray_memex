import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
    app: {
        frames: [{
            id: 'frame-1',
            title: 'Frame 1',
            x: 0,
            y: 0,
            width: 800,
            height: 600,
            windows: [],
        }],
    }
};

// Using createSlice to manage actions and reducers
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateLayout(state, action) {
            const { frameId, layout } = action.payload;
            const frame = state.app.frames.find(f => f.id === frameId);
            console.log('frame', frame);
        },
        addWindow(state, action) {
            const frame = state.app.frames.find(f => f.id === action.payload.frameId);
            if (frame) {
                frame.windows.push(action.payload.window);
            }
        },
        addTab(state, action) {
            const frame = state.app.frames.find(f => f.id === action.payload.frameId);
            if (frame) {
                const window = frame.windows.find(w => w.id === action.payload.windowId);
                if (window) {
                    window.tabs.push(action.payload.tab);
                }
            }
        },
        removeTab(state, action) {
            const frame = state.app.frames.find(f => f.id === action.payload.frameId);
            if (frame) {
                const window = frame.windows.find(w => w.id === action.payload.windowId);
                if (window) {
                    window.tabs = window.tabs.filter(tab => tab.id !== action.payload.tabId);
                }
            }
        },
        setActiveTab(state, action) {
            const frame = state.app.frames.find(f => f.id === action.payload.frameId);
            if (frame) {
                const window = frame.windows.find(w => w.id === action.payload.windowId);
                if (window) {
                    window.tabs.forEach(tab => tab.active = tab.id === action.payload.tabId);
                }
            }
        }
    }
});

// Export actions
export const { updateLayout, addWindow, addTab, removeTab, setActiveTab } = appSlice.actions;

// Create store with Redux Toolkit
export default configureStore({
    reducer: {
        app: appSlice.reducer,
    },
});