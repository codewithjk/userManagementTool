import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  getUserDetailsSuccess,
  updateSelfProfileRequest,
  updateSelfProfileSuccess,
  updateSelfProfileFail,
  getUserDetailsRequest,
  getUserDetailsFail,
} from "./authSlice";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/auth/login`,
      { email, password },
      config
    );
    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      loginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/auth/register`,
      { name, email, password },
      config
    );
    dispatch(loginSuccess(data));
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      loginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(logout());
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(getUserDetailsRequest());

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseURL}/api/users/${id}`, config);
    dispatch(getUserDetailsSuccess(data));
  } catch (error) {
    dispatch(
      getUserDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateSelfProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(updateSelfProfileRequest());

    const {
      auth: { userInfo },
    } = getState();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (user.image) {
      formData.append("image", user.image);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const config = {
      data: formData,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${baseURL}/api/users/${user.id}`,
      formData,
      config
    );
    dispatch(updateSelfProfileSuccess({ ...data, token: userInfo.token }));
    dispatch(loginSuccess({ ...data, token: userInfo.token }));
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...data, token: userInfo.token })
    );
  } catch (error) {
    dispatch(
      updateSelfProfileFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
