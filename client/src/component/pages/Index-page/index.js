import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts_action } from "../../actions/product_action";
import Slider from "../../slider/slider";
import Products from "../../product/products";
import topDealLearning from "../../images/learningOffer.jpeg";
import topDealMachine from "../../images/topDealsOnWashingMachine.jpeg";
import topDealFurntiure from "../../images/FlipKartFurniture.jpeg";
import BuildingImage from "../../images/building.png";
import MobileImage from "../../images/OPPOA12-mobile.jpeg";

import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Index = (props) => {
  const { getProducts_action } = props;
  useEffect(() => {
    getProducts_action();
  }, [getProducts_action]);
  return (
    <>
      <Slider />
      <div className="sale-off-product-cards p-3 bg-grey grid-gap-2">
        <img src={topDealLearning} alt="img" />

        <img src={topDealMachine} alt="img" />

        <img src={topDealFurntiure} alt="img" />
      </div>

      <Products
        sale="Biggest Sale of the Year"
        Loading={props.product.Loading}
        products={props.product.products.filter(
          (product) => product.category === "Biggest Sale of the Year"
        )}
      />

      {/* <Footer /> */}
      {props.product.Loading === true ? (
        <div className="sale-off-product-cards my-4">
          {["", "", ""].map((item, i) => (
            <Skeleton className="product-card skeleton-bg-color" key={i} />
          ))}
        </div>
      ) : (
        <div className="sale-off-product-cards my-4">
          {props.product.products.length > 0
            ? props.product.products.map((product) =>
                product.category === "Card Product" ? (
                  <div
                    className="product-card"
                    key={product.productTitleForURL}
                  >
                    <Link to={`/productDetail/${product.productTitleForURL}`}>
                      <div className="product-card-marker">
                        {product.cardTopMessage}
                      </div>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="product-info">
                          <p className="product-name">
                            {product.productNameForCard}
                          </p>
                          {product.percentageOff > 0 ? (
                            <p className="product-dicounted-price">
                              {product.currencySign} {product.price}
                            </p>
                          ) : null}
                          {/* <p className="product-dicounted-price">{}{product.currencySign}{product.discountPrice}</p> */}
                          {/* <p className="product-price">Just {product.currencySign}{product.price}</p>    */}
                          {product.percentageOff > 0 ? (
                            <p className="product-price">
                              Just {product.currencySign}{" "}
                              {product.discountPrice}
                            </p>
                          ) : (
                            <p className="product-price">
                              Now {product.currencySign} {product.price}
                            </p>
                          )}
                        </div>
                        <div className="product-image">
                          <img
                            src={MobileImage}
                            className="card-image"
                            alt="OPPO A12"
                          />
                        </div>
                      </div>
                      <img
                        src={BuildingImage}
                        alt="building-img"
                        className="building-image"
                      />
                    </Link>
                  </div>
                ) : null
              )
            : null}
        </div>
      )}

      <Products
        sale="Best Product"
        Loading={props.product.Loading}
        products={props.product.products.filter(
          (product) => product.category === "Best Products"
        )}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(mapStateToProps, { getProducts_action })(Index);
