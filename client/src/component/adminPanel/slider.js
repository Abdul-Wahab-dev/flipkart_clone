import React, { useState, useEffect } from "react";
import crossIcon from "../images/cross_icon.png";
import { connect } from "react-redux";
import Loader from "../loader/loader";
import {
  addSliderImage,
  getSliderImage,
  deleteSliderImage,
} from "../actions/product_action";
const Slider = (props) => {
  const [error, setError] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFilesMob, setImageFilesMob] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [imagesURLMob, setImagesURLMob] = useState([]);
  const [images, setImage] = useState([]);
  const [imagesMob, setImageMob] = useState([]);
  const [id, setId] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [imageType, setImageType] = useState();

  const { getSliderImage } = props;
  useEffect(() => {
    getSliderImage();
  }, [getSliderImage]);

  useEffect(() => {
    if (props.error.errors) {
      setError({ ...props.error.errors });
    } else {
      setError({ ...props.error });
    }
  }, [props.error]);
  // Handle Images
  const handleImagesChange = (
    e,
    imageState,
    setImageStateFunc,
    nameArray,
    setNameArray
  ) => {
    let lastFile = [...imageState];
    if (e.target.files[0]) {
      const imageNameArray = [...nameArray];
      imageNameArray.push(e.target.files[0].name);
      setNameArray([...imageNameArray]);

      lastFile.push(e.target.files[0]);
      setImageStateFunc(lastFile);
    }
  };
  const deleteImage = (
    image,
    id,
    imageState,
    setImageStateFunc,
    nameArray,
    setNameArray
  ) => {
    const newArray = imageState.filter((file) => file.name !== image.name);
    const imageNameArray = nameArray.filter((file) => file !== image.name);
    setNameArray([...imageNameArray]);
    setImageStateFunc([...newArray]);
  };

  const uploadImage = () => {
    const fileArray = [...imageFiles, ...imageFilesMob];
    const nameArray = {
      images,
      imagesMob,
      id,
    };
    props.addSliderImage(fileArray, nameArray, getSliderImage);
    setImageFiles([]);
    setImageFilesMob([]);
  };

  useEffect(() => {
    if (props.product.slider.deskTopImage) {
      setImagesURL([...props.product.slider.deskTopImage]);
      setImagesURLMob([...props.product.slider.mobileImages]);
      setId(props.product.slider._id);
    }
  }, [props.product.slider]);

  const setImageModal = (data, type) => {
    setImageType(type);
    setImagePreviewModal(!imagePreviewModal);
    setImagePreview(data);
  };
  return (
    <>
      <form className="adminPanel-product-form p-4 position-relative">
        {error.status === "fail" ? (
          <div class="error-message alert-danger" role="alert">
            {error.message}
          </div>
        ) : null}
        <h2 className="recommonded-heading-h2 border-none m-0">
          Desktop Slider
        </h2>
        <div className="form-group">
          <div className="image-preview-container">
            {imagesURL.length > 0
              ? imagesURL.map((image, i) => (
                  <div className="preview" key={i}>
                    <img
                      src={crossIcon}
                      alt="cross-icon"
                      width="20"
                      className="cross-icon"
                      onClick={() =>
                        props.deleteSliderImage(
                          image,
                          props.product.slider._id,
                          "DESKTOP",
                          getSliderImage
                        )
                      }
                    />
                    <img
                      src={`https://flipkarteecom.s3.us-east-2.amazonaws.com/${image}`}
                      className="cursor-pointer"
                      alt="preview"
                      width="100"
                      onClick={() => setImageModal(image, "String")}
                    />
                  </div>
                ))
              : null}

            {imageFiles.length > 0
              ? imageFiles.map((image, i) => (
                  <div className="preview" key={i}>
                    <img
                      src={crossIcon}
                      alt="cross-icon"
                      width="20"
                      className="cross-icon"
                      onClick={() =>
                        deleteImage(
                          image,
                          i,
                          imageFiles,
                          setImageFiles,
                          images,
                          setImage
                        )
                      }
                    />
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      width="100"
                      className="cursor-pointer"
                      onClick={() => setImageModal(image, "Object")}
                    />
                  </div>
                ))
              : null}
          </div>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFile"
              onChange={(e) =>
                handleImagesChange(
                  e,
                  imageFiles,
                  setImageFiles,
                  images,
                  setImage
                )
              }
            />
            <label class="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
        </div>
        <h2 className="recommonded-heading-h2 border-none m-0">
          Mobile Slider
        </h2>
        <div className="form-group">
          <div className="image-preview-container">
            {imagesURLMob.length > 0
              ? imagesURLMob.map((image, i) => (
                  <div className="preview" key={i}>
                    <img
                      src={crossIcon}
                      alt="cross-icon"
                      width="20"
                      className="cross-icon"
                      onClick={() =>
                        props.deleteSliderImage(
                          image,
                          props.product.slider._id,
                          "MOBILE",
                          getSliderImage
                        )
                      }
                    />
                    <img
                      src={`https://flipkarteecom.s3.us-east-2.amazonaws.com/${image}`}
                      className="cursor-pointer"
                      alt="preview"
                      width="100"
                      onClick={() => setImageModal(image, "String")}
                    />
                  </div>
                ))
              : null}

            {imageFilesMob.length > 0
              ? imageFilesMob.map((image, i) => (
                  <div className="preview" key={i}>
                    <img
                      src={crossIcon}
                      alt="cross-icon"
                      width="20"
                      className="cross-icon"
                      onClick={() =>
                        deleteImage(
                          image,
                          i,
                          imageFilesMob,
                          setImageFilesMob,
                          imagesMob,
                          setImageMob
                        )
                      }
                    />
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      width="100"
                      className="cursor-pointer"
                      onClick={() => setImageModal(image, "Object")}
                    />
                  </div>
                ))
              : null}
          </div>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFile"
              onChange={(e) =>
                handleImagesChange(
                  e,
                  imageFilesMob,
                  setImageFilesMob,
                  imagesMob,
                  setImageMob
                )
              }
            />
            <label class="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="button"
            className="btn btn-primary"
            value="Save"
            onClick={(e) => uploadImage()}
          />
        </div>
      </form>
      {imagePreviewModal === true ? (
        <div
          className="modal d-flex  align-items-center justify-content-center"
          onClick={() => setImagePreviewModal(!imagePreviewModal)}
        >
          {imageType === "String" ? (
            <img
              src={`https://flipkarteecom.s3.us-east-2.amazonaws.com/${imagePreview}`}
              alt="slider-1"
            />
          ) : (
            <img src={URL.createObjectURL(imagePreview)} alt="slider-12" />
          )}
        </div>
      ) : null}
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
  error: state.error,
});
export default connect(mapStateToProps, {
  addSliderImage,
  getSliderImage,
  deleteSliderImage,
})(Slider);
