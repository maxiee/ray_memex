import { configureStore } from '@reduxjs/toolkit';
import gestureReducer from './gestureSlice';
import { windowReducer } from './slices/windows/reducer';

const store = configureStore({
    reducer: {
        windows: windowReducer,
        gesture: gestureReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;