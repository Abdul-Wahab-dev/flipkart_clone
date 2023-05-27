import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartItems, removeCartItem } from "../../actions/cartItem_action";
import { connect } from "react-redux";
import MobileImage from "../../images/OPPOA12-mobile.jpeg";
const Carts = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const { getCartItems } = props;
  useEffect(() => {
    if (localStorage.getItem("cart-item")) {
      getCartItems();
      setCartItems([...props.cart.cartItems]);
    }
  }, [getCartItems]);
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

  const removeCartItem = (item) => {
    props.removeCartItem(item);
  };
  return (
    <section class="cart-section">
      <div class="container">
        <div class="cart-contaienr">
          <div class="carts">
            <h2 class="cart-heading d-sm-none">My Cart</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item, i) => (
                <>
                  <div class="cart" key={i}>
                    <div class="cart-image">
                      <div class="cart-image-container">
                        <img src={MobileImage} alt="cart-1" />
                      </div>
                      {/* <div class='cart-item-qtn'>
                  <div class='decresed'>-</div>
                  <div class='qtn'>1</div>
                  <div class='increased'>+</div>
                </div> */}
                    </div>
                    <div class="cart-item-info">
                      <p class="cart-item-title">{item.productTitle}</p>

                      <p class="cart-item-seller">Seller:{item.seller}</p>
                      <p class="cart-item-Price">
                        <span class="cart-item-cahrged-price">
                          {item.currencySign}{" "}
                          {item.percentageOff > 0
                            ? item.discountPrice
                            : item.price}
                        </span>
                        {item.percentageOff > 0 ? (
                          <>
                            <span class="cart-item-orignal-price">
                              {item.currencySign} {item.price}
                            </span>
                            <span class="cart-item-percentage-off">
                              {item.percentageOff}% Off
                            </span>
                          </>
                        ) : null}
                      </p>
                      <div class="remove-item-container">
                        <Link to="/">
                          <p>SAVE FOR LATER</p>
                        </Link>
                        <p onClick={() => removeCartItem(item)}>REMOVE</p>
                      </div>
                    </div>
                  </div>
                  <div className="remove-item-btn-conatiner d-none">
                    <Link to="/">
                      <input type="button" value="Save for later" />
                    </Link>
                    <input
                      type="button"
                      onClick={() => removeCartItem(item)}
                      value="Remove"
                    />
                  </div>
                </>
              ))
            ) : (
              <div className="empty-cart">
                <p>Your cart is empty</p>
              </div>
            )}
            {cartItems.length > 0 ? (
              <div class="place-order-btn-container">
                <Link to="/checkout">
                  <input
                    type="button"
                    value="Place Order"
                    class="place-order-btn"
                  />
                </Link>
              </div>
            ) : null}
          </div>
          <div class="price-detail-total">
            <h2 class="cart-heading">Price Detail</h2>
            <div class="price-detail-container">
              <div class="original-price">
                <span>Price</span>
                <span>
                  {cartItems.length > 0 ? cartItems[0].currencySign : null}{" "}
                  {total}
                </span>
              </div>
              <div class="discount-price">
                <span>Discount </span>
                <span>
                  − {cartItems.length > 0 ? cartItems[0].currencySign : null}{" "}
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
                  {cartItems.length > 0 ? cartItems[0].currencySign : null}{" "}
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
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartItem,
});
export default connect(mapStateToProps, { getCartItems, removeCartItem })(
  Carts
);
