import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    loading: false,
    error: null,
    success: false,
    totalPages: 0,
    newUser: null,
    edituser: null,
    searchQuery: "",
  },
  reducers: {
    usersRequest: (state) => {
      state.loading = true;
    },
    usersSuccess: (state, action) => {
      state.loading = false;
      state.userList = action.payload.users;
      state.totalPages = action.payload.total;
      state.error = null;
    },
    usersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userCreateRequest: (state) => {
      state.success = false;
      state.loading = true;
    },
    userCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userList.push(action.payload);
      state.newUser = action.payload;
    },
    userCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userEditRequest: (state) => {
      state.success = false;
      state.loading = true;
    },
    userEditSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.edituser = null;
      state.newUser = action.payload;
    },
    userEditFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userRemoveRequest: (state) => {
      state.loading = true;
    },
    userRemoveSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userList = state.userList.filter(
        (user) => user._id !== action.payload.user._id
      );
    },
    userRemoveFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setEditUser: (state, action) => {
      state.edituser = action.payload;
    },
    reset: (state, action) => {
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  usersRequest,
  usersSuccess,
  usersFail,
  userCreateRequest,
  userCreateSuccess,
  userCreateFail,
  userEditRequest,
  userEditSuccess,
  userEditFail,
  setEditUser,
  userRemoveRequest,
  userRemoveFail,
  userRemoveSuccess,
  setSearchQuery,
  reset,
} = usersSlice.actions;

export default usersSlice.reducer;
