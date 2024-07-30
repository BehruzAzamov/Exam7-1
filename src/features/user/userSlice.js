import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReadyState: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    authReady: (state) => {
      state.authReadyState = true;
    },
    resetAuthReady: (state) => {
      state.authReadyState = false;
    },
  },
});

export const { login, logout, authReady, resetAuthReady } = userSlice.actions;
export default userSlice.reducer;
