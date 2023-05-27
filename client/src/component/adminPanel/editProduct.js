import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import crossIcon from "../images/cross_icon.png";
import {
  editProducts_action,
  deleteImageFromS3,
} from "../actions/product_action";
import MobileImage from "../images/OPPOA12-mobile.jpeg";
import Loader from "../loader/loader";
const EditProduct = (props) => {
  const [productTitle, setProductTitle] = useState("");
  const [cardTopMessage, setCardTopMessage] = useState("");
  const [productNameForCard, setPoductNameForCard] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [percentageOff, setPercentageOff] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [images, setImage] = useState([]);
  // const [features , setFeatures] = useState(props.product.product.specification.productSpecification.length>0?props.product.product.specification.productSpecification:[{
  const [features, setFeatures] = useState([
    {
      featureHeading: "",
      feature: [
        {
          featureName: "",
          featureDetail: "",
        },
      ],
    },
  ]);
  const [reviewsManaging, setReviewManaging] = useState([""]);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([""]);
  const [productSpecificationId, setProductSpecificationId] = useState("");
  const [error, setError] = useState({});
  useEffect(() => {
    if (props.error.errors) {
      setError({ ...props.error.errors });
    } else {
      setError({ ...props.error });
    }
  }, [props.error]);
  // Case     componentDidUpdate
  useEffect(() => {
    setProductTitle(props.product.product.productTitle);
    if (props.product.product.category) {
      setCategory(props.product.product.category);
    }
    if (props.product.product.productNameForCard) {
      setPoductNameForCard(props.product.product.productNameForCard);
    }
    if (props.product.product.cardTopMessage) {
      setCardTopMessage(props.product.product.cardTopMessage);
    }
    setBrand(props.product.product.brand);
    setSeller(props.product.product.seller);
    if (props.product.product.description) {
      setDescription(props.product.product.description);
    }
    setStock(props.product.product.stock);
    setPrice(props.product.product.price);
    if (props.product.product.discountPrice) {
      setDiscountPrice(props.product.product.discountPrice);
    }
    if (props.product.product.percentageOff) {
      setPercentageOff(props.product.product.percentageOff);
    }
    if (props.product.product.images) {
      setImagesURL(props.product.product.images);
    }
    if (props.product.product.specification) {
      setFeatures(props.product.product.specification.productSpecification);
      setProductSpecificationId(props.product.product.specification._id);
    }
    if (
      props.product.product.reviews &&
      props.product.product.reviews.length > 0
    ) {
      setReviewManaging(props.product.product.reviews);
    }
    if (
      props.product.product.questionAndAnswers &&
      props.product.product.questionAndAnswers.length > 0
    ) {
      setQuestionAndAnswers(props.product.product.questionAndAnswers);
    }
  }, [props.product.product]);

  useEffect(() => {
    if (price > discountPrice && discountPrice > 0) {
      const a = price - discountPrice;
      const b = a / price;
      setPercentageOff((b * 100).toFixed(2));
    } else {
      setPercentageOff(0);
    }
  }, [discountPrice, price]);
  // Handle Images
  const handleImagesChange = (e) => {
    let lastFile = [...imageFiles];
    if (e.target.files[0]) {
      const imageNameArray = [...images];
      imageNameArray.push(e.target.files[0].name);
      setImage([...imageNameArray]);

      lastFile.push(e.target.files[0]);
      setImageFiles(lastFile);
    }
  };

  const deleteImage = (image, id) => {
    const newArray = imageFiles.filter((file) => file.name !== image.name);
    const imageNameArray = images.filter((file) => file !== image.name);
    setImage([...imageNameArray]);

    setImageFiles([...newArray]);
  };
  const add = (e) => {
    e.preventDefault();
    const product = {
      id: props.product.product._id,
      productTitle,
      category,
      brand,
      seller,
      price: price * 1,
      discountPrice: discountPrice * 1,
      percentageOff: percentageOff * 1,
      stock: stock * 1,
      description,
      features,
      productNameForCard,
      cardTopMessage,
      images: [...imagesURL, ...images],
      reviews: reviewsManaging,
      questionAndAnswers,
      img: imageFiles,
      featureId: productSpecificationId,
    };

    props.editProducts_action(product, clearStates);
  };
  const clearStates = () => {
    setProductTitle("");
    setCategory("");
    setBrand("");
    setSeller("");
    setPrice("");
    setDiscountPrice("");
    setPercentageOff("");
    setStock("");
    setDescription("");
    setCardTopMessage("");
    setPoductNameForCard("");
    setImagesURL([]);
    setReviewManaging([
      {
        reviewBy: "",
        review: "",
        ratting: 0,
      },
    ]);
    setFeatures([
      {
        featureHeading: "",
        feature: [
          {
            featureName: "",
            featureDetail: "",
          },
        ],
      },
    ]);
    setQuestionAndAnswers([
      {
        question: "",
        answer: "",
      },
    ]);
    setImageFiles([]);
    setError({});
  };

  // Manage Features Inner Array
  const manageInnerFeatureArray = (index) => {
    const featureArray = [...features];
    featureArray[index].feature.push({
      featureName: "",
      featureDetail: "",
    });
    setFeatures([...featureArray]);
  };
  const manageOuterFeatureArray = () => {
    const featureArray = [...features];
    featureArray.push({
      featureHeading: "",
      feature: [
        {
          featureName: "",
          featureDetail: "",
        },
      ],
    });
    setFeatures([...featureArray]);
  };
  const handleFeatureChanges = (outerIndex, innerIndex, e) => {
    const array = [...features];

    if (innerIndex === null) {
      array[outerIndex].featureHeading = e.target.value;
    }
    if (e.target.name === "featureName") {
      array[outerIndex].feature[innerIndex].featureName = e.target.value;
    }
    if (e.target.name === "featureDetail") {
      array[outerIndex].feature[innerIndex].featureDetail = e.target.value;
    }
    setFeatures([...array]);
  };
  // Handle Review
  const handleReviewChanges = (index, e) => {
    const reviews = [...reviewsManaging];
    if (e.target.name === "username") {
      reviews[index].reviewBy = e.target.value;
    } else if (e.target.name === "review") {
      reviews[index].review = e.target.value;
    } else if (e.target.name === "ratting") {
      reviews[index].ratting = parseInt(e.target.value);
    }
    setReviewManaging([...reviews]);
  };
  // add more review handler
  const addMoreReviewsHandler = () => {
    const reviews = [...reviewsManaging];
    reviews.push({
      reviewBy: "",
      review: "",
      ratting: 0,
    });
    setReviewManaging([...reviews]);
  };
  // Handle Question and Answer
  const handleQuestionChanges = (index, e) => {
    const array = [...questionAndAnswers];
    if (e.target.name === "question") {
      array[index].question = e.target.value;
    } else if (e.target.name === "answer") {
      array[index].answer = e.target.value;
    }
    setQuestionAndAnswers([...array]);
  };
  // add more review handler
  const addMoreQuestionHandler = () => {
    const array = [...questionAndAnswers];
    array.push({
      question: "",
      answer: "",
    });
    setQuestionAndAnswers([...array]);
  };
  return (
    <>
      <h3>Edit Product</h3>
      <input
        type="button"
        className="btn btn-primary mx-4 mt-2"
        value="Back"
        onClick={() => props.setComponent("PRODUCTS")}
      />
      <form className="adminPanel-product-form p-4 position-relative">
        {error.status === "fail" ? (
          <div class="error-message alert-danger" role="alert">
            {error.message}
          </div>
        ) : null}
        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="productTitle">Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              <option>Biggest Sale of the Year</option>
              <option>Best Products</option>
              <option>Card Product</option>
            </select>
          </div>
        </div>
        {category === "Card Product" ? (
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="productTitle">Product Name For Card</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={productNameForCard}
                onChange={(e) => setPoductNameForCard(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Card Top Message</label>
              <input
                type="text"
                className="form-control"
                placeholder="Seller Name"
                value={cardTopMessage}
                onChange={(e) => setCardTopMessage(e.target.value)}
              />
            </div>
          </div>
        ) : null}
        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="productTitle">Brand</label>
            <input
              type="text"
              className="form-control"
              placeholder="Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Seller</label>
            <input
              type="text"
              className="form-control"
              placeholder="Seller Name"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="productTitle">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Discounted Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="productTitle">Percentage(%) Off</label>
            <input
              type="number"
              className="form-control"
              placeholder="0%"
              value={percentageOff}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Stock</label>
            <input
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group-container">
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
                          props.deleteImageFromS3(
                            [image],
                            props.product.product,
                            true,
                            setImagesURL
                          )
                        }
                      />
                      <img src={MobileImage} alt="preview" width="40" />
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
                        onClick={() => deleteImage(image, i)}
                      />
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        width="40"
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
                onChange={(e) => handleImagesChange(e)}
              />
              <label class="custom-file-label" for="customFile">
                Choose file
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <h2 className="recommonded-heading-h2 border-none m-0">
          Product Features
        </h2>
        {features.map((inner, outerIndex) => (
          <div
            className={
              outerIndex === 0
                ? "features-section border-none"
                : "features-section"
            }
          >
            <div className="form-group">
              <label htmlFor="specification">Features Heading</label>
              <input
                type="text"
                placeholder="Features Heading"
                value={inner.featureHeading}
                name="featureHeading"
                className="form-control"
                onChange={(e) => handleFeatureChanges(outerIndex, null, e)}
              />
            </div>
            {inner.feature.map((featur, innerIndex, innerArray) => (
              <div className="form-group-container" key={innerIndex}>
                <div className="form-group flex-3 mr-2">
                  <label htmlFor="featureName">Feature Name</label>
                  <input
                    type="text"
                    placeholder="Feature Name"
                    value={featur.featureName}
                    name="featureName"
                    className="form-control"
                    onChange={(e) =>
                      handleFeatureChanges(outerIndex, innerIndex, e)
                    }
                  />
                </div>
                <div className="form-group flex-3 mr-2">
                  <label htmlFor="featuredetail">Feature Detail</label>
                  <input
                    type="text"
                    placeholder="Feature Detail"
                    name="featureDetail"
                    value={featur.featureDetail}
                    className="form-control"
                    onChange={(e) =>
                      handleFeatureChanges(outerIndex, innerIndex, e)
                    }
                  />
                </div>
                <div className="form-group flex-1 my-auto">
                  {innerIndex === innerArray.length - 1 ? (
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="+"
                      onClick={() => manageInnerFeatureArray(outerIndex)}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="form-group">
          <input
            className="btn btn-primary"
            type="button"
            value="Add More"
            onClick={() => manageOuterFeatureArray()}
          />
        </div>
        <h2 className="recommonded-heading-h2 border-none m-0">
          Product Reviews
        </h2>
        {reviewsManaging.map((review, outerIndex) => (
          <div
            key={outerIndex}
            className={
              outerIndex === 0
                ? "features-section border-none"
                : "features-section"
            }
          >
            <div className="form-group">
              <label htmlFor="username-review">Review by user</label>
              <input
                type="text"
                placeholder="username"
                name="username"
                className="form-control"
                value={review.reviewBy}
                onChange={(e) => handleReviewChanges(outerIndex, e)}
              />
            </div>
            <div className="form-group-container">
              <div className="form-group">
                <label htmlFor="featureName">Review</label>
                <input
                  type="text"
                  placeholder="review"
                  name="review"
                  value={review.review}
                  className="form-control"
                  onChange={(e) => handleReviewChanges(outerIndex, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="featuredetail">Rating</label>
                <select
                  className="form-control"
                  name="ratting"
                  value={review.ratting}
                  onChange={(e) => handleReviewChanges(outerIndex, e)}
                >
                  <option>Select Ratting</option>
                  <option>1</option>

                  <option>2</option>

                  <option>3</option>

                  <option>4</option>

                  <option>5</option>
                </select>
                {/* <input type="text" placeholder="Feature Detail" name="featureDetail"   className="form-control"/>      */}
              </div>
            </div>
          </div>
        ))}
        <div className="form-group">
          <input
            type="button"
            value="Add review"
            className="btn btn-primary"
            onClick={() => addMoreReviewsHandler()}
          />
        </div>
        <h2 className="recommonded-heading-h2 border-none m-0">
          Product Questions
        </h2>
        {questionAndAnswers.map((question, outerIndex) => (
          <div
            key={outerIndex}
            className={
              outerIndex === 0
                ? "features-section border-none"
                : "features-section"
            }
          >
            <div className="form-group-container">
              <div className="form-group">
                <label htmlFor="featureName">Question</label>
                <input
                  type="text"
                  placeholder="question"
                  name="question"
                  value={question.question}
                  className="form-control"
                  onChange={(e) => handleQuestionChanges(outerIndex, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="featuredetail">Answer</label>
                <input
                  type="text"
                  placeholder="answer"
                  name="answer"
                  value={question.answer}
                  className="form-control"
                  onChange={(e) => handleQuestionChanges(outerIndex, e)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="form-group">
          <input
            type="button"
            value="Add Q&A"
            className="btn btn-primary"
            onClick={() => addMoreQuestionHandler()}
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            value="Edit Product"
            onClick={(e) => add(e)}
            className="btn btn-primary"
          />
        </div>
        {props.product.Loading === true ? (
          <div className="w-100 h-100 adminpane-product-loader-container">
            <Loader />
          </div>
        ) : null}
      </form>
    </>
  );
};
const mapStateTOProps = (state) => ({
  product: state.product,
  error: state.error,
});
export default connect(mapStateTOProps, {
  editProducts_action,
  deleteImageFromS3,
})(EditProduct);
