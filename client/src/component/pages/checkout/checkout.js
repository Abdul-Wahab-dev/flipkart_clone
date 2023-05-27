import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems, emptyCart } from "../../actions/cartItem_action";
import MobileImage from "../../images/OPPOA12-mobile.jpeg";
const Checkout = (props) => {
  const [component, setComponent] = useState("Address");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState({});

  const { getCartItems } = props;

  const getCartItem = useCallback(() => {
    setCartItems(props.cart.cartItems);
  }, [props.cart.cartItems.length]);
  // Get data from localStorage

  useEffect(() => {
    if (localStorage.getItem("cart-item")) {
      getCartItems(getCartItem);
    }
  }, [getCartItems, getCartItem]);

  // save address and called next component : Order Summary
  const saveAddress = (e) => {
    e.preventDefault();
    if (
      fullName.length > 0 &&
      address.length > 0 &&
      phone.length > 0 &&
      city.length > 0 &&
      state.length > 0 &&
      pinCode.length > 0
    ) {
      setComponent("OrderSummary");
    } else {
      setError({
        username: "username is required",
        address: "address is required",
        state: "state is required",
        city: "city is required",
        phone: "phone is required",
        pinCode: "pinCode is required",
      });
    }
  };

  // place order
  const placeOrder = () => {
    clearStateFun();
  };

  const clearStateFun = (e) => {
    localStorage.setItem("cart-item", JSON.stringify([]));
  };

  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });
  let discount = 0;
  cartItems.forEach((item) => {
    if (item.percentageOff > 0) {
      discount += item.discountPrice;
    }
  });
  let grandTotal = 0;
  cartItems.forEach((item) => {
    if (item.percentageOff > 0) {
      grandTotal += item.discountPrice;
    } else {
      grandTotal += item.price;
    }
  });

  // Check cart item availble
  const checkCartItem = (e) => {
    if (localStorage.getItem("cart-item")) {
      const cartItems = JSON.parse(localStorage.getItem("cart-item"));
      if (cartItems.length > 0) {
        setComponent("Payment");
      }
    }
  };
  return (
    <>
      {/* {checkOut === true ? ( */}
      <div>
        <div className="container checkout-status-list">
          <div className="status flex-1">
            <div
              className={
                component === "OrderSummary" || component === "Payment"
                  ? "circle completed-status"
                  : "circle active-status"
              }
            >
              {component === "OrderSummary" || component === "Payment" ? (
                <span className="completed-tick">&#10003;</span>
              ) : (
                1
              )}
            </div>
            Address
          </div>
          <div
            className={
              component === "OrderSummary" || component === "Payment"
                ? "line-bar line-bar-completed flex-2"
                : "line-bar flex-2"
            }
          ></div>
          <div className="status flex-1 text-align-center">
            <div
              className={
                component === "Payment"
                  ? "circle completed-status"
                  : component === "OrderSummary"
                  ? "circle active-status"
                  : "circle"
              }
            >
              {component === "Address" || component === "OrderSummary" ? (
                2
              ) : (
                <span className="completed-tick">&#10003;</span>
              )}
            </div>
            Order Summary
          </div>
          <div
            className={
              component === "Payment"
                ? "line-bar line-bar-completed flex-2"
                : "line-bar flex-2"
            }
          ></div>
          <div className="status flex-1">
            <div
              className={
                component === "Address" || component === "OrderSummary"
                  ? "circle"
                  : "circle active-status"
              }
            >
              3
            </div>
            Payment
          </div>
        </div>
        {component === "Address" ? (
          <section className="address-section">
            <div className="container">
              <div className="recommonded-heading">
                <h2 className="recommonded-heading-h2">Personal Info</h2>
              </div>
              <form>
                <div className="form-group-container">
                  <div className="form-group">
                    <label for="fullName"> Full Name </label>
                    <input
                      type="text"
                      placeholder="Full Name (Required)*"
                      className="form-control"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {error.username && (
                      <div className="invalid-feedback">{error.username}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label for="Phone">Phone number</label>
                    <input
                      type="number"
                      placeholder="Phone number (Required)*"
                      className="form-control"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {error.phone && (
                      <div className="invalid-feedback">{error.phone}</div>
                    )}
                  </div>
                </div>
                <div className="form-group-container form-group-container-city-state">
                  <div className="form-group">
                    <label for="State">State</label>
                    <input
                      type="text"
                      placeholder="State (Required)*"
                      className="form-control"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    {error.state && (
                      <div className="invalid-feedback">{error.state}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label for="fullName">City</label>
                    <input
                      type="text"
                      placeholder="City (Required)*"
                      className="form-control"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {error.city && (
                      <div className="invalid-feedback">{error.city}</div>
                    )}
                  </div>
                </div>
                <div className="form-group-container">
                  <div className="form-group">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      placeholder="Address (Required)*"
                      className="form-control"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {error.address && (
                      <div className="invalid-feedback">{error.address}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label for="Pincode">Postal Code</label>
                    <input
                      type="text"
                      placeholder="Postal code (Required)*"
                      className="form-control pincode-form-control"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                    {error.pinCode && (
                      <div className="invalid-feedback">{error.pinCode}</div>
                    )}
                  </div>
                </div>
                <input
                  type="submit"
                  value="Add"
                  className="save-add-btn cursor-pointer"
                  onClick={(e) => saveAddress(e)}
                />
              </form>
            </div>
          </section>
        ) : null}
        {component === "OrderSummary" ? (
          <div className="container">
            <div className="order-summary-section">
              <h2 className="recommonded-heading-h2 border-none">Your Order</h2>
              <div class="cart-contaienr">
                <div class="carts box-shadow-none">
                  <h2 class="cart-heading d-sm-none">Your Order</h2>
                  {cartItems.length > 0 ? (
                    cartItems.map((cart) => (
                      <div class="cart" key={cart.productTitle}>
                        <div class="cart-image">
                          <div class="cart-image-container">
                            <img src={MobileImage} alt="cart" />
                          </div>
                        </div>
                        <div class="cart-item-info">
                          <p class="cart-item-title">{cart.productTitle}</p>
                          <p class="cart-item-specification">{cart.brand}</p>
                          <p class="cart-item-seller">Quantity : 1</p>
                          <p class="cart-item-Price">
                            <span class="cart-item-cahrged-price">
                              {cart.currencySign}{" "}
                              {cart.percentageOff > 0
                                ? cart.discountPrice
                                : cart.price}
                            </span>
                            {cart.percentageOff > 0 ? (
                              <>
                                <span class="cart-item-orignal-price">
                                  {cart.currencySign} {cart.price}
                                </span>
                                <span class="cart-item-percentage-off">
                                  {cart.percentageOff}% Off
                                </span>
                              </>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-cart">
                      <p>Your cart is empty</p>
                    </div>
                  )}
                </div>
                <div class="price-detail-total box-shadow-none">
                  <h2 class="cart-heading">Price Detail</h2>
                  <div class="price-detail-container">
                    <div class="original-price">
                      <span>Price</span>
                      <span>
                        {cartItems.length > 0
                          ? cartItems[0].currencySign
                          : null}{" "}
                        {total}
                      </span>
                    </div>
                    <div class="discount-price">
                      <span>Discount </span>
                      <span>
                        −{" "}
                        {cartItems.length > 0
                          ? cartItems[0].currencySign
                          : null}{" "}
                        {total - discount}
                      </span>
                    </div>
                    <div class="delivery-price">
                      <span>Delivery Charges </span>
                      <span>FREE</span>
                    </div>

                    <div class="total-price">
                      <span>Total Amount </span>
                      <span>
                        {cartItems.length > 0
                          ? cartItems[0].currencySign
                          : null}{" "}
                        {grandTotal}
                      </span>
                    </div>
                    <p class="save-msg">
                      You will save{" "}
                      {cartItems.length > 0 ? cartItems[0].currencySign : null}{" "}
                      {total - discount} on this order
                    </p>
                  </div>
                </div>
              </div>

              <div className="btn-container">
                <input
                  type="button"
                  value="Back"
                  className="btn-secondary btn cursor-pointer border-radius-0"
                  onClick={(e) => setComponent("Address")}
                />
                {cartItems.length > 0 ? (
                  <input
                    type="button"
                    value="Continue"
                    className="save-add-btn cursor-pointer"
                    onClick={(e) => checkCartItem(e)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {component === "Payment" ? (
          <section>
            <div className="container">
              <div className="recommonded-heading">
                <h2 className="recommonded-heading-h2">Payment Option</h2>
              </div>
              <label className="radio-btn-container">
                Wallet
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
              <label className="radio-btn-container">
                Credit / Debit / ATM Card
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
              <label className="radio-btn-container">
                Net Banking
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
              <div className="btn-container">
                <input
                  type="button"
                  value="Back"
                  className="btn-secondary btn cursor-pointer border-radius-0"
                  onClick={(e) => setComponent("OrderSummary")}
                />
                <Link
                  to="/"
                  onClick={() => placeOrder()}
                  className="save-add-btn"
                >
                  {/* <input
                    type="Button"
                    value="Place Order"
                    
                  /> */}
                  Place Order
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </div>
      {/* // ) : null} */}
      {/* {succes === true ? (
        <div>
          <div className="order-placed-info">
            <div className="container">
              <h3 className="recommonded-heading-h2 border-none m-0 p-0">
                Track Order
              </h3>
              <p className="text-align-center">
                Total price for {cartItems.length} items : ₹{grandTotal}
              </p>
            </div>
          </div>
          <div className="container">
            <div
              className="p-3 border-bottom w-100"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "18px" }}>
                Confirm sales product through our ekart app
              </p>
            </div>
            <div className="p-3 w-100" style={{ lineHeight: "25px" }}>
              <p style={{ fontSize: "18px" }}>{fullName}</p>
              <p>{phone}</p>
              <p>{city}</p>
              <p>{address}</p>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "#2874f0",
              padding: "20px",
              color: "#fff",
            }}
          >
            <p className="recommonded-heading-h2 m-0">
              Thanks for choosing visa / Rupay
            </p>
          </div>
        </div>
      ) : null} */}
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartItem,
});
export default connect(mapStateToProps, {
  getCartItems,
  emptyCart,
})(Checkout);
