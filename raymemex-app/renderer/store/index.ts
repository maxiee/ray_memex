import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WindowManagerState = {
    windows: []
};

// Using createSlice to manage actions and reducers
const appSlice = createSlice({
    name: 'winowManager',
    initialState,
    reducers: {
        updateLayout(state, action: PayloadAction<{ windowId: string; layout: any }>) {
            const { windowId, layout } = action.payload;
            const window = state.windows.find((w) => w.id === windowId);
            if (window) {
                window.layout = layout;
            }
        },
        addWindow(state, action) {
            state.windows.push(action.payload.window);
        },
        addTab(state, action) {
            const window = state.windows.find(w => w.id === action.payload.windowId);
            if (window) {
                window.tabs.push(action.payload.tab);
            }
        },
        removeTab(state, action) {
            const window = state.windows.find(w => w.id === action.payload.windowId);
            if (window) {
                window.tabs = window.tabs.filter(tab => tab.id !== action.payload.tabId);
            }
        },
        setActiveTab(state, action) {
            const window = state.windows.find(w => w.id === action.payload.windowId);
            if (window) {
                window.tabs.forEach(tab => {
                    tab.active = tab.id === action.payload.tabId;
                });
            }
        }
    }
});

// Export actions
export const { updateLayout, addWindow, addTab, removeTab, setActiveTab } = appSlice.actions;

// Create store with Redux Toolkit
export default configureStore({
    reducer: {
        windowManager: appSlice.reducer,
    },
});