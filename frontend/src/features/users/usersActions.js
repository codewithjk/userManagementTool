import axios from "axios";
import {
  usersRequest,
  usersSuccess,
  usersFail,
  userCreateRequest,
  userCreateSuccess,
  userCreateFail,
  userEditRequest,
  userEditSuccess,
  userEditFail,
  userRemoveRequest,
  userRemoveFail,
  userRemoveSuccess,
} from "./usersSlice";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const listUsers =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch(usersRequest());
      const {
        auth: { userInfo },
      } = getState();
      const {
        users: { searchQuery },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseURL}/api/users?page=${page}&search=${searchQuery}`,
        config
      );
      dispatch(usersSuccess({ users: data.users, total: data.total }));
    } catch (error) {
      dispatch(
        usersFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const createUser =
  (name, email, password, isAdmin) => async (dispatch, getState) => {
    try {
      dispatch(userCreateRequest());
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/api/users`,
        { name, email, password, isAdmin },
        config
      );
      dispatch(userCreateSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(
        userCreateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userEditRequest());

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (user.image) {
      formData.append("image", user.image);
    }

    const { data } = await axios.put(
      `${baseURL}/api/users/${user.id}`,
      formData,
      config
    );
    dispatch(userEditSuccess(data));
  } catch (error) {
    dispatch(
      userEditFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const deleteUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userRemoveRequest());

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${baseURL}/api/users/${user._id}`,
      config
    );
    dispatch(userRemoveSuccess(data));
  } catch (error) {
    dispatch(
      userRemoveFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
