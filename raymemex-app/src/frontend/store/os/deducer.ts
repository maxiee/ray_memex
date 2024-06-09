import { AnyAction } from "@reduxjs/toolkit";
import { osInitialState } from "./state";
import { SET_IS_DRAG_DISABLE } from "./constants";

export const osReducer = (state = osInitialState, action: AnyAction) => {
    switch (action.type) {
        case SET_IS_DRAG_DISABLE:
            return {
                ...state,
                isDragDisable: action.payload.status
            };
        default:
            return state;
    }
}