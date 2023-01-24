import { configureStore } from "@reduxjs/toolkit";
import { api } from "./Api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    //[announcementApi.reducerPath]: announcementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      api.middleware,
      //announcementApi.middleware,
    ]),
});
export default store;
