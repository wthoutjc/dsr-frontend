import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    logged: false,
  },
};

const authSlice = createSlice({
  name: "[AUTH]",
  initialState,
  reducers: {
    login: (state) => {
      state.user.logged = true;
    },
    logout: (state) => {
      state.user.logged = false;
    },
  },
});

export { authSlice };

// Actions
export const { login, logout } = authSlice.actions;

// Selector to access to the store
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
