import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileImage from "../images/OPPOA12-mobile.jpeg";

import image from "../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png";
import Recommended from "./recommended";
import { connect } from "react-redux";
import {
  getProduct_action,
  getProducts_action,
} from "../actions/product_action";
import { addToCart } from "../actions/cartItem_action";

import Skeleton from "react-loading-skeleton";
const ProductDetail = (props) => {
  const [component, setComponent] = useState("Highlights");
  const [product, setProduct] = useState({});
  const { getProducts_action, getProduct_action } = props;
  useEffect(() => {
    getProduct_action(props.match.params.URL);
    window.screenTop = 0;
    getProducts_action();
  }, [getProduct_action, getProducts_action, props.match.params.URL]);

  const getProduct = (URL) => {
    getProducts_action();
    getProduct_action(URL);
  };
  useEffect(() => {
    setProduct(props.product.product);
  }, [props]);
  window.addEventListener("scroll", () => {
    if (document.getElementById("orderConformDiv")) {
      document.getElementById(
        "orderConformDiv"
      ).style.top = `${document.documentElement.scrollTop}px`;
    }
  });

  const addToCart = (e) => {
    if (localStorage.getItem("cart-item")) {
      const cartItems = JSON.parse(localStorage.getItem("cart-item"));
      if (cartItems.length > 0) {
        const checkForproduct = cartItems.filter(
          (item) => item._id === product._id
        );
        if (checkForproduct.length > 0) {
          return null;
        } else {
          if (product) {
            props.addToCart(product);
          }
        }
      } else {
        props.addToCart(product);
      }
    } else {
      props.addToCart(product);
    }
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="product-detail-container">
            <div className="product-images">
              <div className="d-flex w-100 align-items-start product-images-inner">
                <div id="orderConformDiv">
                  <div className="d-flex flex-direction-column-mobile">
                    <div className="images-list">
                      <ul className="image-ul">
                        {product.images && props.product.Loading !== true ? (
                          product.images.map((img, i) => (
                            <li key={i}>
                              <div className="bg-image">
                                <img
                                  src={MobileImage}
                                  className="image-list"
                                  alt="img"
                                />
                              </div>
                            </li>
                          ))
                        ) : (
                          <Skeleton
                            count={1}
                            className="mt-1"
                            height={70}
                            width={60}
                          />
                        )}
                      </ul>
                    </div>
                    <div className="main-image">
                      <div>
                        {product.images && props.product.Loading !== true ? (
                          <img src={MobileImage} className="image" alt="img" />
                        ) : (
                          <Skeleton
                            height={500}
                            width={350}
                            count={1}
                            className="main-image-skeleton"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {product.stock > 0 ? (
                    <div className="cart-buy-btn-container">
                      <Link to="/cart">
                        <input
                          type="button"
                          value="Add to Cart"
                          className="w-100 p-3 but-now-btn add-to-cart  cursor-pointer"
                          onClick={(e) => addToCart(e)}
                        />
                      </Link>
                      <Link to={"/checkout"}>
                        <input
                          type="button"
                          value="Buy Now"
                          className="w-100 p-3 but-now-btn cursor-pointer"
                          onClick={(e) => addToCart(e)}
                        />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="product-detail">
              <h1 className="product-heading">
                {product.productTitle && props.product.Loading !== true ? (
                  product.productTitle
                ) : (
                  <Skeleton count={1} height={35} />
                )}
              </h1>
              {product.productTitle && props.product.Loading !== true ? (
                <div className="rating-summary">
                  <span className="rating-span">4.5</span>
                  <span className="rating">
                    53,434 Ratings {"&"} 3,759 Reviews
                  </span>
                </div>
              ) : (
                <Skeleton className="my-2" count={1} height={35} />
              )}

              {product.price && props.product.Loading !== true ? (
                <h2 className="product-price">
                  {product.percentageOff > 0 ? (
                    <>
                      <sapn className="mr-2">
                        {product.currencySign} {product.discountPrice}
                      </sapn>
                      <span className="product-dicount text-decoration-line-through">
                        {product.currencySign} {product.price}
                      </span>{" "}
                      <span className="product-percentageOff">
                        {product.percentageOff}% Off
                      </span>
                    </>
                  ) : (
                    <sapn>
                      {product.currencySign} {product.price}
                    </sapn>
                  )}
                </h2>
              ) : (
                <Skeleton count={1} height={35} />
              )}

              <ul className="specification-container-ul border-none">
                {product.stock > 0 && props.product.Loading !== true ? (
                  product.stock > 0 ? (
                    <li>
                      <span>Available</span>
                      <span>in hand</span>
                    </li>
                  ) : (
                    <li>
                      <span>Available</span>

                      <span className="sold-out">SOLD OUT</span>
                    </li>
                  )
                ) : (
                  <Skeleton count={1} className="mt-4" height={25} />
                )}
                {product.brand && props.product.Loading !== true ? (
                  <li>
                    <span>Brand</span>
                    <span>{product.brand}</span>
                  </li>
                ) : (
                  <Skeleton count={1} className="mt-2" height={25} />
                )}
                {product.seller && props.product.Loading !== true ? (
                  <li>
                    <span>seller</span>
                    <span>{product.seller}</span>
                  </li>
                ) : (
                  <Skeleton count={1} className="mt-2" height={25} />
                )}
                {product.description && props.product.Loading !== true ? (
                  <li>
                    <span>Description</span>
                    <span>{product.description}</span>
                  </li>
                ) : null}
              </ul>
              <div>
                {product.productTitle && props.product.Loading !== true ? (
                  <p className="available-offers">Available offers</p>
                ) : (
                  <Skeleton className="mt-4" count={1} height={25} />
                )}
                <ul className="available-offers-ul">
                  {product.productTitle && props.product.Loading !== true ? (
                    <li>
                      <span>
                        <img
                          src={image}
                          className="mr-1"
                          width="18px"
                          height="18px"
                          alt="img"
                        />
                      </span>
                      <span className="pr-1">
                        <b>Bank Offer</b>
                      </span>
                      <span>
                        7% Instant discount on EMI txns using YES Bank Credit
                        Cards
                      </span>
                    </li>
                  ) : (
                    <Skeleton className="mt-2" count={1} height={25} />
                  )}
                  {product.productTitle && props.product.Loading !== true ? (
                    <li>
                      <span>
                        <img
                          src={image}
                          className="mr-1"
                          width="18px"
                          height="18px"
                          alt="img"
                        />
                      </span>
                      <span className="pr-1">
                        <b>Bank Offer</b>
                      </span>
                      <span>
                        7% Instant discount on EMI txns using YES Bank Credit
                        Cards
                      </span>
                    </li>
                  ) : (
                    <Skeleton className="mt-2" count={1} height={25} />
                  )}
                  {product.productTitle && props.product.Loading !== true ? (
                    <li>
                      <span>
                        <img
                          src={image}
                          className="mr-1"
                          width="18px"
                          height="18px"
                          alt="img"
                        />
                      </span>
                      <span className="pr-1">
                        <b>Bank Offer</b>
                      </span>
                      <span>
                        7% Instant discount on EMI txns using YES Bank Credit
                        Cards
                      </span>
                    </li>
                  ) : (
                    <Skeleton className="mt-2" count={1} height={25} />
                  )}
                  {product.productTitle && props.product.Loading !== true ? (
                    <li>
                      <span>
                        <img
                          src={image}
                          className="mr-1"
                          width="18px"
                          height="18px"
                          alt="img"
                        />
                      </span>
                      <span className="pr-1">
                        <b>Bank Offer</b>
                      </span>
                      <span>
                        7% Instant discount on EMI txns using YES Bank Credit
                        Cards
                      </span>
                    </li>
                  ) : (
                    <Skeleton className="mt-2" count={1} height={25} />
                  )}
                </ul>
              </div>

              <ul className="component-ul">
                <li
                  onClick={() => setComponent("Highlights")}
                  className={
                    component === "Highlights" ? "component-li-active" : ""
                  }
                >
                  Highlights
                </li>
                <li
                  onClick={() => setComponent("Reviews")}
                  className={
                    component === "Reviews" ? "component-li-active" : ""
                  }
                >
                  Reviews
                </li>
                <li
                  onClick={() => setComponent("Questions")}
                  className={
                    component === "Questions" ? "component-li-active" : ""
                  }
                >
                  Questions
                </li>
              </ul>

              {product.specification ? (
                product.specification.productSpecification.length > 0 ? (
                  <div className="specification-container d-sm-none">
                    {product.specification.productSpecification.map(
                      (productFeatures, index) => (
                        <ul className="specification-container-ul" key={index}>
                          {index === 0 ? (
                            <li className="ul-main-heading specifications-heading">
                              Specifications
                            </li>
                          ) : null}

                          <li>{productFeatures.featureHeading}</li>
                          {productFeatures.feature.length > 0
                            ? productFeatures.feature.map((feature) => (
                                <li key={feature.featureName}>
                                  <span>{feature.featureName}</span>
                                  <span>{feature.featureDetail}</span>
                                </li>
                              ))
                            : null}
                        </ul>
                      )
                    )}
                  </div>
                ) : null
              ) : null}
              {component === "Highlights" ? (
                <div className="specification-container d-sm-block d-none">
                  {product.specification
                    ? product.specification.productSpecification.length > 0
                      ? product.specification.productSpecification.map(
                          (productFeatures, index) => (
                            <ul
                              className="specification-container-ul"
                              key={productFeatures.featureHeading}
                            >
                              {index === 0 ? (
                                <li className="ul-main-heading specifications-heading">
                                  Specifications
                                </li>
                              ) : null}

                              <li>{productFeatures.featureHeading}</li>
                              {productFeatures.feature.length > 0
                                ? productFeatures.feature.map((feature) => (
                                    <li key={feature.featureName}>
                                      <span>{feature.featureName}</span>
                                      <span>{feature.featureDetail}</span>
                                    </li>
                                  ))
                                : null}
                            </ul>
                          )
                        )
                      : null
                    : null}
                </div>
              ) : null}
              {product.reviews && props.product.Loading !== true ? (
                <div className="rating-and-reviews-container d-sm-none">
                  <p className="specifications-heading">
                    Ratings {"&"} Reviews
                  </p>
                  <div className="d-flex rating-details">
                    <div className="rating-details-text">
                      <p className="rating-point">
                        4.5 <span className="rating-star">★</span>
                      </p>

                      <p className="number-of-rating">53,434 Ratings {"&"}</p>
                      <p className="number-of-rating">3,759 Reviews</p>
                    </div>
                    <div className="rating-details-graphs">
                      <ul>
                        <li>
                          <span className="small-rating">5 </span>
                          <span className="small-rating-star">★</span>
                          <span className="rating-bar-main">
                            <span className="rating-bar rating-bar-1"></span>
                          </span>
                          <span className="number-of-reviews">38,892</span>
                        </li>
                        <li>
                          <span className="small-rating">4</span>
                          <span className="small-rating-star">★</span>
                          <span className="rating-bar-main">
                            <span className="rating-bar rating-bar-2"></span>
                          </span>
                          <span className="number-of-reviews">38,892</span>
                        </li>
                        <li>
                          <span className="small-rating">3 </span>
                          <span className="small-rating-star">★</span>
                          <span className="rating-bar-main">
                            <span className="rating-bar rating-bar-3"></span>
                          </span>
                          <span className="number-of-reviews">38,892</span>
                        </li>
                        <li>
                          <span className="small-rating">2 </span>
                          <span className="small-rating-star">★</span>
                          <span className="rating-bar-main">
                            <span className="rating-bar rating-bar-4"></span>
                          </span>
                          <span className="number-of-reviews">38,892</span>
                        </li>
                        <li>
                          <span className="small-rating">1</span>
                          <span className="small-rating-star">★</span>
                          <span className="rating-bar-main">
                            <span className="rating-bar rating-bar-5"></span>
                          </span>
                          <span className="number-of-reviews">38,892</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="reviews-container">
                    <ul className="reviews-ul mt-3">
                      {product.reviews
                        ? product.reviews.length > 0
                          ? product.reviews.map((review) => (
                              <li key={review.review}>
                                <div className="d-flex align-items-center">
                                  <span className="rating-span mr-2">
                                    {review.ratting} ★
                                  </span>
                                  <p>{review.reviewBy}</p>
                                </div>
                                <p className="mt-3 review">{review.review}</p>
                              </li>
                            ))
                          : null
                        : null}
                    </ul>
                  </div>
                </div>
              ) : (
                <Skeleton count={1} height={150} className="mt-4" />
              )}
              {component === "Reviews" ? (
                product.reviews && props.product.Loading !== true ? (
                  <div className="rating-and-reviews-container">
                    <p className="specifications-heading">
                      Ratings {"&"} Reviews
                    </p>
                    <div className="d-flex rating-details">
                      <div className="rating-details-text">
                        <p className="rating-point">
                          4.5 <span className="rating-star">★</span>
                        </p>

                        <p className="number-of-rating">53,434 Ratings {"&"}</p>
                        <p className="number-of-rating">3,759 Reviews</p>
                      </div>
                      <div className="rating-details-graphs">
                        <ul>
                          <li>
                            <span className="small-rating">5 </span>
                            <span className="small-rating-star">★</span>
                            <span className="rating-bar-main">
                              <span className="rating-bar rating-bar-1"></span>
                            </span>
                            <span className="number-of-reviews">38,892</span>
                          </li>
                          <li>
                            <span className="small-rating">4</span>
                            <span className="small-rating-star">★</span>
                            <span className="rating-bar-main">
                              <span className="rating-bar rating-bar-2"></span>
                            </span>
                            <span className="number-of-reviews">38,892</span>
                          </li>
                          <li>
                            <span className="small-rating">3 </span>
                            <span className="small-rating-star">★</span>
                            <span className="rating-bar-main">
                              <span className="rating-bar rating-bar-3"></span>
                            </span>
                            <span className="number-of-reviews">38,892</span>
                          </li>
                          <li>
                            <span className="small-rating">2 </span>
                            <span className="small-rating-star">★</span>
                            <span className="rating-bar-main">
                              <span className="rating-bar rating-bar-4"></span>
                            </span>
                            <span className="number-of-reviews">38,892</span>
                          </li>
                          <li>
                            <span className="small-rating">1</span>
                            <span className="small-rating-star">★</span>
                            <span className="rating-bar-main">
                              <span className="rating-bar rating-bar-5"></span>
                            </span>
                            <span className="number-of-reviews">38,892</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="reviews-container">
                      <ul className="reviews-ul mt-3">
                        {product.reviews
                          ? product.reviews.length > 0
                            ? product.reviews.map((review) => (
                                <li key={review.review}>
                                  <div className="d-flex align-items-center">
                                    <span className="rating-span mr-2">
                                      {review.ratting}
                                    </span>
                                    <p>{review.reviewBy}</p>
                                  </div>
                                  <p className="mt-3 review">{review.review}</p>
                                </li>
                              ))
                            : null
                          : null}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Skeleton height={100} count={1} />
                )
              ) : null}
              {component === "Questions" ? (
                product.questionAndAnswers ? (
                  product.questionAndAnswers.length > 0 ? (
                    <div className="specification-container">
                      <ul className="specification-container-ul">
                        <li className="ul-main-heading specifications-heading">
                          Questions and Answers
                        </li>
                        {product.questionAndAnswers.map((question, i) => (
                          <li className="question-and-answer" key={i}>
                            <div>
                              <p className="Q-A">Q: {question.question}</p>
                              <p className="answer">
                                <span className="Q-A"> A:</span>{" "}
                                {question.answer}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                ) : null
              ) : null}

              {product.questionAndAnswers ? (
                product.questionAndAnswers.length > 0 ? (
                  <div className="specification-container d-sm-none">
                    <ul className="specification-container-ul">
                      <li className="ul-main-heading specifications-heading">
                        Questions and Answers
                      </li>
                      {product.questionAndAnswers.map((question, i) => (
                        <li className="question-and-answer" key={i}>
                          <div>
                            <p className="Q-A">Q: {question.question}</p>
                            <p className="answer">
                              <span className="Q-A"> A:</span> {question.answer}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              ) : null}
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      <Recommended
        getProduct={getProduct}
        products={props.product.products.filter(
          (item) =>
            item.category === product.category && item._id !== product._id
        )}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(mapStateToProps, {
  getProduct_action,
  addToCart,
  getProducts_action,
})(ProductDetail);
