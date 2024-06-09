import { SET_IS_DRAG_DISABLE } from "./constants";

export const setIsDragDisable = (status: boolean) => ({
    type: SET_IS_DRAG_DISABLE,
    payload: { status }
});