import { configureStore } from "@glue4/redux";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    // It is important that the property name of the reducer matches the name assigned in the slice
    counter: counterReducer,
    // The reducer can combine local-only and sync state slices
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
