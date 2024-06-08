import { RootState } from "../../store";

export const selectWindows = (state: RootState) => state.windows.elements;