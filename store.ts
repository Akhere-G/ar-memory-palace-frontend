import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "./slices/GroupSlice";
import noteReducer from "./slices/NoteSlice";

export const store = configureStore({
  reducer: {
    group: groupReducer,
    note: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
