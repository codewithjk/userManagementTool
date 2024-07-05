import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userInfo: null, loading: false, error: null },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
    getUserDetailsRequest: (state) => {
      state.loading = true;
    },
    getUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    getUserDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSelfProfileRequest: (state) => {
      state.loading = true;
    },
    updateSelfProfileSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    updateSelfProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  getUserDetailsRequest,
  getUserDetailsSuccess,
  getUserDetailsFail,
  updateSelfProfileRequest,
  updateSelfProfileSuccess,
  updateSelfProfileFail,
} = authSlice.actions;

export default authSlice.reducer;
