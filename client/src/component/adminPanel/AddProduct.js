import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import crossIcon from "../images/cross_icon.png";
import { addProduct_action } from "../actions/product_action";
import Loader from "../loader/loader";
const AddProduct = (props) => {
  const [productTitle, setProductTitle] = useState("");
  const [cardTopMessage, setCardTopMessage] = useState("");
  const [productNameForCard, setPoductNameForCard] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [percentageOff, setPercentageOff] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const [featureManaging, setFeatureManaging] = useState([[""]]);
  const [reviewsManaging, setReviewManaging] = useState([
    {
      reviewBy: "",
      review: "",
      ratting: 0,
    },
  ]);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
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
      lastFile.push(e.target.files[0]);
      setImageFiles(lastFile);
    }
  };
  const deleteImage = (image, id) => {
    const newArray = imageFiles.filter((file) => file.name !== image.name);
    setImageFiles([...newArray]);
  };
  const add = async (e) => {
    const imageNameArray = [];
    if (imageFiles.length > 0) {
      imageFiles.forEach((image) => {
        imageNameArray.push(image.name);
      });
    }

    e.preventDefault();
    const product = {
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
      images: imageNameArray,
      reviews: reviewsManaging,
      questionAndAnswers,
      img: imageFiles,
      productNameForCard,
      cardTopMessage,
    };
    props.addProduct_action(product, clearStates);
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
    setFeatureManaging([[""]]);
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
    const array = [...featureManaging];
    array[index].push("");

    setFeatureManaging([...array]);

    const featureArray = [...features];
    featureArray[index].feature.push({
      featureName: "",
      featureDetail: "",
    });
  };
  const manageOuterFeatureArray = () => {
    const array = [...featureManaging];
    array.push([""]);
    setFeatureManaging(array);

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
      <form className="adminPanel-product-form p-4 position-relative">
        {error.status === "fail" ? (
          <div class="error-message alert-danger" role="alert">
            {error.message}
          </div>
        ) : null}
        <h2 className="recommonded-heading-h2 border-none m-0">Product Info</h2>
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

            {/* <input 

                  type="text"
                  className="form-control" 
                  placeholder="Category"
                  value={category}
                  onChange={(e)=> setCategory(e.target.value)}
                  /> */}
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
              placeholder="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group-container">
          <div className="form-group">
            <div className="image-preview-container">
              {imageFiles.length > 0 ? (
                imageFiles.map((image, i) => (
                  <div className="preview">
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
              ) : (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <p>image preview</p>
                </div>
              )}
            </div>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                name="myImage"
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
        {featureManaging.map((inner, outerIndex) => (
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
                name="featureHeading"
                className="form-control"
                onChange={(e) => handleFeatureChanges(outerIndex, null, e)}
              />
            </div>
            {inner.map((featur, innerIndex, innerArray) => (
              <div className="form-group-container">
                <div className="form-group flex-3 mr-2">
                  <label htmlFor="featureName">Feature Name</label>
                  <input
                    type="text"
                    placeholder="Feature Name"
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
            value="Add Product"
            onClick={(e) => add(e)}
            className="btn btn-danger cursor-pointer"
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
export default connect(mapStateTOProps, { addProduct_action })(AddProduct);
