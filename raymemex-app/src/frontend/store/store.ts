import { configureStore } from '@reduxjs/toolkit';
import gestureReducer from './gestureSlice';
import { windowReducer } from './slices/windows/reducer';
import { osReducer } from './os/deducer';

const store = configureStore({
    reducer: {
        windows: windowReducer,
        os: osReducer,
        gesture: gestureReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;