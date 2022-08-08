/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loggedStatus: boolean
}

const initialState = { loggedStatus: false } as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn(state) {
      state.loggedStatus = true;
    },
    logOut(state) {
      state.loggedStatus = false;
    },
  },
});

export const { loggedIn, logOut } = userSlice.actions;
export default userSlice.reducer;
