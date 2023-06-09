import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./component/reducer";

const initialState = {};

const middleware = [thunk];
let stopReduxOnProductionMode =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middleware))
    : compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : (f) => f
      );
const store = createStore(rootReducer, initialState, stopReduxOnProductionMode);

export default store;
