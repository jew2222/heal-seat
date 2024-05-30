import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLogin: boolean;
}

const initialState: UserState = { isLogin: false };

const timerSlice = createSlice({
  name: "user",
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
  },
});

export const { increment } = timerSlice.actions;
export default timerSlice.reducer;
