import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
