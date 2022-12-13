import { createSyncSlice } from "@glue4/redux";
import { PayloadAction } from "@reduxjs/toolkit";

// Sync slice states can be of any shape, as long as they are serializable (strings, numbers, objects)
const initialState: number = 0;

export const counterSlice = createSyncSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: (_count) => {
      return 0;
    },
    increment: (count, { payload }: PayloadAction<number>) => {
      return count + payload;
    },
  },
});

export const { reset, increment } = counterSlice.actions;

export default counterSlice.reducer;
