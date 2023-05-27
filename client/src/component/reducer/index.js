import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import ProductReducer from "./productReducer";
import cartItemReducer from "./cartItemReducer";
export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
  product: ProductReducer,
  cartItem: cartItemReducer,
});
