import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT_BY_ID,
  DELETE_PRODUCT,
  GET_SLIDER_IMAGES,
  PRODUCT_LOADING,
  GET_PRODUCTS,
} from "../actions/types";

const initialState = {
  products: [],
  product: {},
  Loading: false,
  slider: {},
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        Loading: false,
        products: [action.payload, ...state.products],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        Loading: false,
        products: action.payload,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        Loading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id
            ? (product = action.payload)
            : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        Loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        Loading: false,
        product: { ...action.payload },
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        Loading: action.payload,
      };
    case GET_SLIDER_IMAGES:
      return {
        ...state,
        slider: { ...action.payload },
      };
    default:
      return state;
  }
}
