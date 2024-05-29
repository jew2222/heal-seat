import { configureStore } from "@reduxjs/toolkit";
import { time } from "console";
//import rootReducer from "./rootReducer";
import timerReducer from "./redux/timer/timerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      timer: timerReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
