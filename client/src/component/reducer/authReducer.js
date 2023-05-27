import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, AUTH_LOADING } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
