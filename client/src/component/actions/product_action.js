import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT_BY_ID,
  DELETE_PRODUCT,
  PRODUCT_LOADING,
  GET_PRODUCTS,
  GET_ERRORS,
  GET_SLIDER_IMAGES,
} from "./types";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
// @route     POST /api/products/
// @desc      add Product
// @access    Private
export const addProduct_action = (product, clearStates) => (dispatch) => {
  dispatch(loading());
  axios
    .post(`${apiURL}/api/products`, product)
    .then(async (res) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data.data.product,
      });
      clearStates();
    })
    .catch((err) => {
      dispatch(loadingFalse());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
// @route     POST /api/products/image-upload
// @desc      upload images to aws s3
// access     Private
const imageUploadHandler = (img, res, clearStates, update) => (dispatch) => {
  const formData = new FormData();
  for (let x = 0; x < img.length; x++) {
    formData.append("myImage", img[x]);
  }
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .post(`${apiURL}/api/products/image-upload`, formData, config)
    .then((image) => {
      clearStates();

      return dispatch({
        type: update === true ? EDIT_PRODUCT : ADD_PRODUCT,
        payload: res.data.data.product,
      });
    })
    .catch((err) => {
      dispatch(loadingFalse());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
// @route     GET /api/products/
// @desc      get Products
// @access    Public
export const getProducts_action = () => (dispatch) => {
  dispatch(loading());
  axios.get(`${apiURL}/api/products/`).then((res) => {
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.data.products,
    });
  });
};

// @route     GET /api/products/
// @desc      get Product by id
// @access    Public
export const getProduct_action = (id) => (dispatch) => {
  dispatch(loading());

  axios.get(`${apiURL}/api/products/${id}`).then((res) => {
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data.data.product,
    });
  });
};

// @route     PUT /api/products/
// @desc      Edit Products
// @access    Private
export const editProducts_action = (product, clearStates) => (dispatch) => {
  dispatch(loading());
  axios
    .post(`${apiURL}/api/products/update`, { product })
    .then((res) => {
      if (res.data.status === "success") {
        if (product.img.length > 0) {
          dispatch(imageUploadHandler(product.img, res, clearStates, true));
        } else {
          clearStates();
          dispatch({
            type: EDIT_PRODUCT,
            payload: res.data.data.product,
          });
        }
      }
    })
    .catch((err) => {
      dispatch(loadingFalse());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteImageFromS3 =
  (deleteImage, product, type, setImagesURL) => (dispatch) => {
    const imageArray = deleteImage;
    dispatch(loading());
    axios
      .post(`${apiURL}/api/products/delete-image`, {
        imageArray,
        product,
        type,
      })
      .then((res) => {
        if (type === true) {
          if (setImagesURL !== null) {
            setImagesURL([...res.data.data.product.images]);
          }
          dispatch({
            type: EDIT_PRODUCT,
            payload: res.data.data.product,
          });
        } else {
          dispatch({
            type: DELETE_PRODUCT,
            payload: product,
          });
        }
      });
  };
// @route     DELETE /api/products/
// @desc      delete Product
// @access    Private
export const deleteProduct_action = (product) => (dispatch) => {
  product.id = product._id;
  dispatch(loading());

  axios.delete(`${apiURL}/api/products/${product._id}`).then((res) => {
    dispatch(deleteImageFromS3(product.images, product, false, null));
    // dispatch({
    //   type: DELETE_PRODUCT,
    //   payload: res.data.data.product
    // })
  });
};
// @route     EDIT /api/products/slider-img
// @desc      Add slider images
// @access    Private
export const addSliderImage = (sliderImage, nameArray, cb) => (dispatch) => {
  dispatch(loading());

  const formData = new FormData();
  for (let x = 0; x < sliderImage.length; x++) {
    formData.append("myImage", sliderImage[x]);
  }
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  axios
    .post(`${apiURL}/api/products/image-upload`, formData, config)

    .then((res) => {
      axios
        .post(`${apiURL}/api/products/slider-image`, nameArray)
        .then((result) => {
          cb();
          dispatch(loadingFalse());
        });
    });
};

// route      GET /api/product/slider-images
// desc       get Slider Image
// access     Public
export const getSliderImage = () => (dispatch) => {
  dispatch(loading());
  axios.get(`${apiURL}/api/products/slider`).then((res) => {
    dispatch(loadingFalse());
    dispatch({
      type: GET_SLIDER_IMAGES,
      payload: res.data.data.sliderImage[0],
    });
  });
};

// route      POST /api/product/delete-slider-image
// desc       delete Slider Image
// access     private

export const deleteSliderImage = (name, id, type, callback) => (dispatch) => {
  dispatch(loading());
  axios
    .post(`${apiURL}/api/products/delete-slider-image`, {
      image: name,
      id,
      type,
    })
    .then((res) => {
      callback();
      dispatch(loadingFalse());
      // dispatch({
      //   type: GET_SLIDER_IMAGES,
      //   payload: res.data.data.sliderImage[0]
      // })
    });
};

// Loading
const loading = () => {
  return {
    type: PRODUCT_LOADING,
    payload: true,
  };
};
const loadingFalse = () => {
  return {
    type: PRODUCT_LOADING,
    payload: false,
  };
};
