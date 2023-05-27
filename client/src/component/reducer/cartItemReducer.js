import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEMS,
} from "../actions/types";

const initialState = {
  cartItems: [],
};

export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
}
