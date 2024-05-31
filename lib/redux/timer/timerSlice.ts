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
      //console.log("타이머 :" + state.time);
    },
    setByAmount(state, action) {
      console.log("타이머 시간 저장" + state);

      state.time = action.payload;
    },
    //toggleActive(state) {
    //  state.isActive = !state.isActive;
    //},
    reset: (state) => {
      state.time = 0; //하루 지나면 초기화
      state.isActive = false;

      console.log("타이머 리셋");
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      console.log("액티브 상태 변경됨");
      state.isActive = action.payload;
    },
    //  setTime: (state, action: PayloadAction<number>) => {
    //state.time = action.payload;
    //  },
  },
});

export const { increment, reset, setActive, setByAmount } = timerSlice.actions;
export default timerSlice.reducer;
