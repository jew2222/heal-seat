import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  isActive: boolean;
  time: number;
}

const initialState: TimerState = { isActive: false, time: 0 };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    increment(state) {
      state.time += 1;
    },
    setByAmount(state, action) {
      state.time = action.payload;
    },
    reset: (state) => {
      state.time = 0;
      state.isActive = false;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    //  setTime: (state, action: PayloadAction<number>) => {
    //state.time = action.payload;
    //  },
  },
});

export const { increment, reset, setActive, setByAmount } = timerSlice.actions;
export default timerSlice.reducer;
