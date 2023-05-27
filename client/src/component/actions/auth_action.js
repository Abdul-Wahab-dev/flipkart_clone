import axios from "axios";

// import { LOGIN } from "./types";
import {
  SET_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  AUTH_LOADING,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

const apiURL = process.env.REACT_APP_API_URL;
// @route   POST api/user/Login
// @desc    login user
export const loginUser = (user, history, clearState) => (dispatch) => {
  dispatch(loading());
  dispatch(clearErrors());
  axios
    .post(`${apiURL}/api/user/Login`, user)
    .then((res) => {
      clearState();
      history.push("/");
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      // console.log(err.response.data)
      {
        dispatch(loadingFalse());
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

const loading = () => {
  return {
    type: AUTH_LOADING,
    payload: true,
  };
};

const loadingFalse = () => {
  return {
    type: AUTH_LOADING,
    payload: false,
  };
};
