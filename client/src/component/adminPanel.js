import React, { useState } from "react";
import AddProduct from "./adminPanel/AddProduct";
import Products from "./adminPanel/products";
import EditProduct from "./adminPanel/editProduct";
import Slider from "./adminPanel/slider";

const AdminPanel = (props) => {
  const [component, setComponent] = useState("newOrder");
  const [editProduct, setEditProduct] = useState();

  return (
    <div className="background-color">
      <div className="header">
        <h3>Adminpanel</h3>
      </div>
      <div className="sidebar">
        <ul className="sidebar-ul">
          <li
            className={
              component === "ADDPRODUCT" ? "OTP-li active-link" : "OTP-li"
            }
            onClick={() => setComponent("ADDPRODUCT")}
          >
            Add Product
          </li>
          <li
            className={
              component === "PRODUCTS" ? "OTP-li active-link" : "OTP-li"
            }
            onClick={() => setComponent("PRODUCTS")}
          >
            Products
          </li>
          <li
            className={component === "SLIDER" ? "OTP-li active-link" : "OTP-li"}
            onClick={() => setComponent("SLIDER")}
          >
            Slider
          </li>
        </ul>
      </div>
      <div className="adminpanel-dashboard">
        <div className="adminpanel-dashboard-container">
          {component === "ADDPRODUCT" ? <AddProduct /> : null}
          {component === "PRODUCTS" ? (
            <Products setComponent={setComponent} setProduct={setEditProduct} />
          ) : null}
          {component === "EDITPRODUCT" ? (
            <EditProduct
              updateProduct={editProduct}
              setComponent={setComponent}
            />
          ) : null}
          {component === "SLIDER" ? <Slider /> : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
