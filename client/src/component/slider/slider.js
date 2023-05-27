import React from "react";
import { connect } from "react-redux";

import { getSliderImage } from "../actions/product_action";
import Slide1Mob from "../images/slider-mobile.jpg";
import Slide1D from "../images/slider-desk-xl.jpg";
import Slide2D from "../images/slide2xl.jpg";
import Slide2Mob from "../images/slide2sm.jpg";
import Skeleton from "react-loading-skeleton";
// import $ from "jquery";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Slider(props) {
  // const [imagesURL, setImagesURL] = useState([]);
  // const [imagesURLMob, setImagesURLMob] = useState([]);

  // useEffect(() => {
  //   if (imagesURL.length === 0) {
  //     props.getSliderImage();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (props.product.slider.deskTopImage) {
  //     setImagesURL([...props.product.slider.deskTopImage]);
  //     setImagesURLMob([...props.product.slider.mobileImages]);
  //   }
  // }, [props.product.slider]);

  return (
    <>
      {props.product.Loading === true ? (
        <Skeleton count={1} height="300px" width="100%" />
      ) : (
        <div className="slider-desk">
          <Carousel
            autoPlay={true}
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
          >
            {/* {} */}
            <div style={{ height: "280px" }}>
              <img src={Slide1D} alt="img" className="img-desk d-block" />
            </div>
            <div style={{ height: "280px" }}>
              <img src={Slide2D} alt="img" className="img-desk d-block" />
            </div>
            {/* {[Slide1D, Slide2D].map((image) => (
              
            ))} */}
          </Carousel>
        </div>
      )}
      {props.product.Loading === true ? (
        <Skeleton count={1} height="300px" width="100%" />
      ) : (
        <div className="slider-mobile d-none">
          <Carousel
            autoPlay={true}
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
          >
            {/* {imagesURLMob.map((image) => (
              <div style={{ height: "320px" }}>
                <img
                  src={`https://flipkarteecom.s3.us-east-2.amazonaws.com/${image}`}
                  alt="img"
                />
              </div>
            ))} */}
            <div style={{ height: "320px" }}>
              <img src={Slide1Mob} alt="img" />
            </div>
            <div style={{ height: "320px" }}>
              <img src={Slide2Mob} alt="img" />
            </div>
            {/* <div>
                <img src={Slidesm}  alt="img"/>
              </div> */}

            {/* <div>
              <img src={Slide2sm} alt="img" />
            </div> */}
          </Carousel>
        </div>
      )}

      {/* <div id='slider'>
   
        <ul>
          <li>
            <img
              src={Slide}
              srcSet={`
          ${SlidexL} 1600w,
             ${Slidelg} 1000w,
            ${Slidesm} 320w
        `}
              className='img-desk d-block'
            />
            <img
              src='./images/slider-mobile.jpg'
              className='slider-mobile d-none img-desk'
            />
          </li>
         
          <li>SLIDE 3</li>
         
        </ul>
      </div> */}
    </>
  );
}
const mapStateToProps = (state) => ({
  product: state.product,
  error: state.error,
});
export default connect(mapStateToProps, { getSliderImage })(Slider);
