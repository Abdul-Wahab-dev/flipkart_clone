import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./stylesheet.css";
import AdminPanel from "./component/adminPanel";

import Login from "./component/auth/login";
import Index from "./component/pages/Index-page/index";
import ProductDetail from "./component/product/productDetail";
import Checkout from "./component/pages/checkout/checkout";
import Carts from "./component/pages/cart/carts";
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import PrivateRoute from "./component/common/privateRoute";
import ScrollToTop from "./ScrollToTop";

import store from "./store";
import setAuthToken from "./component/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./component/actions/auth_action";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

function App(props) {
  return (
    <Provider store={store}>
      <Router history={props.history}>
        <ScrollToTop />
        <div className="App">
          <Header />
          <Route exact path="/" component={Index} />

          <Route exact path="/productDetail/:URL" component={ProductDetail} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/cart" component={Carts} />
          <Route exact path="/admin-login" component={Login} />

          <PrivateRoute exact path="/adminpanel" component={AdminPanel} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
