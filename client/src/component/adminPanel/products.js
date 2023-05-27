import React, { useState, useEffect } from "react";
import {
  getProducts_action,
  deleteProduct_action,
  getProduct_action,
} from "../actions/product_action";
import { connect } from "react-redux";
import Loader from "../loader/loader";
import MobileImage from "../images/OPPOA12-mobile.jpeg";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const { getProducts_action } = props;
  useEffect(() => {
    getProducts_action();
  }, [getProducts_action]);

  useEffect(() => {
    if (props.product) {
      if (props.product.products) {
        setProducts(props.product.products);
      }
    }
  }, [props.product]);

  const editProduct = (e, updateProduct) => {
    e.preventDefault();
    props.setComponent("EDITPRODUCT");
    props.getProduct_action(updateProduct.productTitleForURL);
  };

  const deleteProduct = (e, product) => {
    let x = window.confirm("Press ok to delete!");
    if (x === true) {
      e.preventDefault();
      props.deleteProduct_action(product);
    }
  };
  return (
    <>
      <h3>Products</h3>

      <table id="customers">
        <tr>
          <th>Sr.</th>
          <th>Image</th>
          <th>Title</th>
          <th>Stock</th>
          <th>Price</th>
          <th></th>
        </tr>
        {products.length > 0 ? (
          products.map((product, i) => (
            <tr key={i++}>
              <td>{i + 1}</td>
              <td>
                <img src={MobileImage} alt="product-1" width="30" />
              </td>
              <td style={{ width: "500px" }}>{product.productTitle}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>
                <input
                  type="button"
                  value="Edit"
                  className="btn-primary btn mr-2"
                  onClick={(e) => editProduct(e, product)}
                />
                <input
                  type="button"
                  value="Delete"
                  className="btn btn-danger"
                  onClick={(e) => deleteProduct(e, product)}
                />
              </td>
            </tr>
          ))
        ) : (
          <null></null>
        )}
      </table>

      {props.product.Loading === true ? (
        <div className="w-100 h-100 adminpane-product-loader-container">
          <Loader />
        </div>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(mapStateToProps, {
  getProducts_action,
  deleteProduct_action,
  getProduct_action,
})(Products);
