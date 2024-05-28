import { createSlice } from '@reduxjs/toolkit';

interface GestureState {
    isDragging: boolean;
}

const initialState: GestureState = {
    isDragging: false,
};

export const gestureSlice = createSlice({
    name: 'gesture',
    initialState,
    reducers: {
        startDragging: (state) => {
            state.isDragging = true;
        },
        stopDragging: (state) => {
            state.isDragging = false;
        },
    },
});

export const { startDragging, stopDragging } = gestureSlice.actions;

export default gestureSlice.reducer;