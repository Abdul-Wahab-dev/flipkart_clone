import React, { useState, useEffect } from "react";
import FlipKartLogo from "../images/flipkartLogo.png";
import plus from "../images/plus_aef861.png";
import { getCartItems } from "../actions/cartItem_action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Header = (props) => {
  const [cartItems, setCartItems] = useState(0);
  const { getCartItems } = props;
  useEffect(() => {
    if (localStorage.getItem("cart-item")) {
      getCartItems();
      setCartItems(props.cart.cartItems.length);
    }
  }, [props.cart.cartItems.length, getCartItems]);

  return (
    <header className="bg-primary-color w-100">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="logo mr-3 d-flex align-items-center justify-content-between">
          {/* <h3 className='white-color'>FlipKart</h3> */}
          <div className="d-flex">
            <div className="humburger-menu d-none">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Link to={"/"}>
              <div>
                <img src={FlipKartLogo} alt="logo" width="75px" />
                <div className="logo-content d-flex">
                  <p>
                    {" "}
                    Explore
                    <span> Plus</span>
                  </p>
                  <span>
                    <img src={plus} alt="plus-icon" width="10px" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <Link to="/cart">
            <div className="d-none d-sm-block position-relative">
              {cartItems > 0 ? (
                <div className="number-of-cart-item"></div>
              ) : null}
              <svg
                className="V3C5bO"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="_1bS9ic"
                  d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                  fill="#fff"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
        <div className="search-bar flex-1">
          <input
            type="text"
            placeholder="search for products , brands and more"
            className="form-control"
          />
        </div>
        <Link to={"/cart"}>
          <div className="Login-info d-flex align-items-center cursor-pointer d-sm-none position-relative mr-2">
            {cartItems > 0 ? <div className="number-of-cart-item"></div> : null}
            <svg
              className="V3C5bO"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="_1bS9ic"
                d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                fill="#fff"
              ></path>
            </svg>
            <p className="white-color">Cart</p>
          </div>
        </Link>
        {props.user.isAuthenticated ? (
          <Link to="/adminpanel">
            <div className="Login-info d-flex align-items-center cursor-pointer d-sm-none position-relative white-color ">
              Adminpanel
            </div>
          </Link>
        ) : null}
      </div>
    </header>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cartItem,
  user: state.auth,
});
export default connect(mapStateToProps, { getCartItems })(Header);
