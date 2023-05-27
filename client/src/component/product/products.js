import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import MobileImage from "../images/OPPOA12-mobile.jpeg";

const Products = (props) => {
  return props.Loading === true ? (
    <div className="container">
      <div className="d-grid products-row">
        {["", "", "", "", "", "", "", ""].map((item, i) => (
          <div className="product border-none" key={i}>
            <Skeleton
              count={1}
              width={200}
              height={270}
              className="product-card-skeleton"
            />
          </div>
        ))}
      </div>
    </div>
  ) : props.products.length > 0 ? (
    <>
      <div className="Section-heading">
        <h2 className="text-align-center">{props.sale}</h2>
        {/* <p className='total-product text-align-center'>8 Items</p> */}
      </div>

      <div className="container">
        <div className="d-grid products-row">
          {props.products.map((product) => (
            <div className="product" key={product.productTitleForURL}>
              <Link to={`/productDetail/${product.productTitleForURL}`}>
                {product.percentageOff > 0 ? (
                  <div className="product-sale-bar">
                    {product.percentageOff}% off sale
                  </div>
                ) : null}

                <div className="image-container">
                  <img src={MobileImage} alt="product-1" />
                </div>
                <p className="product-title">
                  {product.productTitle.length > 99
                    ? product.productTitle.slice(1, 100) + "..."
                    : product.productTitle}
                </p>
                {product.percentageOff > 0 ? (
                  <p className="product-feature text-decoration-line-through">
                    {product.currencySign} {product.price}
                  </p>
                ) : null}
                {product.percentageOff > 0 ? (
                  <p className="product-price">
                    Now {product.currencySign} {product.discountPrice}
                  </p>
                ) : (
                  <p className="product-price">
                    Now {product.currencySign} {product.price}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : null;
};
export default Products;
