import { configureStore } from '@reduxjs/toolkit';
import gestureReducer from './gestureSlice';

const store = configureStore({
    reducer: {
        gesture: gestureReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;