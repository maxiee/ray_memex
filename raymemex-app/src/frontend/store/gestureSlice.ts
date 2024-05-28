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
            console.log('startDragging');
            state.isDragging = true;
        },
        stopDragging: (state) => {
            console.log('stopDragging');
            state.isDragging = false;
        },
    },
});

export const { startDragging, stopDragging } = gestureSlice.actions;

export default gestureSlice.reducer;