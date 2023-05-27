const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
// const multer = require("multer");
// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");
// const path = require("path");
// Products Model
const Products = require("../../models/Product");
const ProductSpecification = require("../../models/ProductSpecification");
const Slider = require("../../models/SliderImage");
// Error Controller
const AppError = require("../../Utils/appError");
const Product = require("../../models/Product");

// Image Handler

// aws.config.update({
//   secretAccessKey: require("../../config/keys").secretAccessKeyS3,

//   accessKeyId: require("../../config/keys").accessKeyIdS3,

//   region: require("../../config/keys").regionS3,
// });
// const s3 = new aws.S3();
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: require("../../config/keys").bucketNameS3,
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// }).array("myImage");

// const deleteImage = (image, res) => {
//   s3.deleteObject(
//     {
//       Bucket: require("../../config/keys").bucketNameS3,
//       Key: `${image}`,
//     },
//     function (err, data) {
//       if (err) {
//         return res.status(400).json({
//           status: "fail",
//           message: "Image does not delete",
//         });
//       }
//     }
//   );
// };

// route      GET /api/products/slider
// desc       get slider image
// access      Public
router.get("/slider", async (req, res) => {
  const SliderImage = await Slider.find({});
  if (!SliderImage) {
    return res.status(404).json({
      status: "success",
      message: "images not available",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      sliderImage: SliderImage,
    },
  });
});

// @route     POST /api/products/delete-image
// @desc      delete-product image
// @access    Private
router.post("/delete-image", async (req, res, next) => {
  try {
    let array = [...req.body.product.images];
    let newArray = [];
    req.body.imageArray.map(async (image) => {
      // await deleteImage(image, res);
      newArray = array.filter((file) => file !== image);
    });
    if (req.body.type === true) {
      const product = await Product.findById(req.body.product._id);
      // check Product Present
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "Product not Found with that ID",
        });
      }
      product.images = newArray;
      const updatedProduct = await product.save();
      // check product successfully update

      if (!updatedProduct) {
        return res.status(400).json({
          status: "fail",
          message: "Product not Update",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          product: updatedProduct,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          message: "Delete Success",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
// @route     POST /api/products/
// @desc      Add product
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    try {
      if (req.body.features.length > 0) {
        const productSpecification = new ProductSpecification({
          productSpecification: req.body.features,
        });

        productSpecification.save().then((feature) => {
          const newProduct = new Products({
            productTitle: req.body.productTitle,
            category: req.body.category,
            specification: feature._id,
            brand: req.body.brand,
            seller: req.body.seller,
            description: req.body.description,
            productTitleForURL: req.body.productTitleForURL,
            stock: req.body.stock,
            price: req.body.price,
            discountPrice: req.body.discountPrice,
            currencySign: req.body.currencySign,
            percentageOff: req.body.percentageOff,
            reviews: req.body.reviews,
            images: req.body.images,
            questionAndAnswers: req.body.questionAndAnswers,
            productNameForCard: req.body.productNameForCard,
            cardTopMessage: req.body.cardTopMessage,
          });
          newProduct
            .save()
            .then((product) => {
              return res.json({
                status: "success",
                data: {
                  product,
                },
              });
            })
            .catch((err) => {
              if (err.name === "ValidationError") {
                const errors = Object.values(err.errors).map(
                  (el) => el.message
                );
                const message = `Invalid input data. ${errors.join(". ")}`;
                return res.status(400).json({
                  status: "fail",
                  message,
                });
              }
              if (err.code === 11000) {
                const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
                const message = `Duplicate field value: ${value}. Please use another value!`;
                return res.status(400).json({
                  status: "fail",
                  message,
                });
              }
            });
        });
      } else {
        const newProduct = new Products({
          productTitle: req.body.productTitle.trim(),
          category: req.body.category.trim(),
          brand: req.body.brand.trim(),
          seller: req.body.seller.trim(),
          description: req.body.description.trim(),
          images: req.body.images,
          productTitleForURL: req.body.productTitleForURL.trim(),
          stock: req.body.stock,
          price: req.body.price,
          discountPrice: req.body.discountPrice,
          currencySign: req.body.currencySign.trim(),
          percentageOff: req.body.percentageOff,
          images: req.body.images,
          productNameForCard: req.body.productNameForCard,
          cardTopMessage: req.body.cardTopMessage,
        });
        newProduct.save().then((product) => {
          res.json({
            status: "success",
            data: {
              product,
            },
          });
        });
      }
    } catch (err) {
      //  next(new AppError('Product not add' , 400 ))
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
);

// @route     POST /api/products/image-upload
// @desc      upload image to aws
// acccess    Private
router.post("/image-upload", (req, res) => {
  // upload(req, res, (err) => {
  //   if (err) {
  //     return res.json({
  //       message: err.message,
  //       error: err,
  //     });
  //   } else {
  //     if (req.files == undefined) {
  //       return res.status(400).json({
  //         status: "fail",
  //         message: "image is not upload",
  //       });
  //     } else {
  //       return res.json({
  //         file: req.files,
  //       });
  //     }
  //   }
  // });
});

// @route     GET /api/products/
// @desc      get products
// @access    Public
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.find({})
      .populate("-specification")
      .sort("-date");

    if (!products) {
      return res.status(404).json({
        status: "fail",
        message: "Product not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Product not Found",
    });
  }
});

// @route     GET /api/products/:id
// @desc      get product
// @access    Public
router.get("/:URL", async (req, res, next) => {
  try {
    const product = await Products.findOne({
      productTitleForURL: req.params.URL,
    }).populate("specification");

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});
// @route     PUT /api/products/
// @desc      edit product
// @access    Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.body.product.featureId) {
      ProductSpecification.findById(req.body.product.featureId)
        .then((features) => {
          features.productSpecification = req.body.product.features;
          features.save().then((feature) => {
            if (
              req.body.product.productTitle === "" ||
              req.body.product.brand === "" ||
              req.body.product.category === "" ||
              req.body.product.price === "" ||
              req.body.product.price === 0 ||
              req.body.product.stock === "" ||
              req.body.product.seller === ""
            ) {
              return res.status(400).json({
                status: "fail",
                message:
                  "Name is required , Category is required , seller is required , brand is required , price is required , stock is required",
              });
            }
            Product.findByIdAndUpdate(
              req.body.product.id,
              {
                productTitle: req.body.product.productTitle,
                category: req.body.product.category,
                brand: req.body.product.brand,
                seller: req.body.product.seller,
                price: req.body.product.price,
                discountPrice: req.body.product.discountPrice,
                percentageOff: req.body.product.percentageOff,
                description: req.body.product.description,
                images: req.body.product.images,
                stock: req.body.product.stock,
                reviews: req.body.product.reviews,
                questionAndAnswers: req.body.product.questionAndAnswers,
                productNameForCard: req.body.product.productNameForCard,
                cardTopMessage: req.body.product.cardTopMessage,
              },
              {
                new: true,
                runValidators: true,
              }
            )
              .then((product) => {
                // product.productTitle = req.body.product.productTitle
                // product.category = req.body.product.category
                // product.brand = req.body.product.brand
                // product.seller = req.body.product.seller
                // product.price = req.body.product.price
                // product.discountPrice = req.body.product.discountPrice
                // product.percentageOff = req.body.product.percentageOff
                // product.description = req.body.product.description
                // product.images = req.body.product.images
                // product.stock = req.body.product.stock
                // product.reviews = req.body.product.reviews
                // product.questionAndAnswers = req.body.product.questionAndAnswers
                // product.save().then(update => {
                res.status(200).json({
                  status: "success",
                  data: {
                    product,
                  },
                });
              })
              .catch((err) => {
                if (err.name === "ValidationError") {
                  const errors = Object.values(err.errors).map(
                    (el) => el.message
                  );
                  const message = `Invalid input data. ${errors.join(". ")}`;
                  return res.status(400).json({
                    status: "fail",
                    message,
                  });
                }
                if (err.code === 11000) {
                  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
                  const message = `Duplicate field value: ${value}. Please use another value!`;
                  return res.status(400).json({
                    status: "fail",
                    message,
                  });
                }
                return res.status(400).json({
                  status: "fail",
                  message: "There is problem to update product",
                });
              });
          });
        })
        .catch((err) => {
          return res.status(404).json({
            status: "fail",
            message: err.message,
          });
        });
    } else {
      Product.findById(req.body.product.id)
        .then((product) => {
          product.productTitle = req.body.product.productTitle;
          product.category = req.body.product.category;
          product.brand = req.body.product.brand;
          product.seller = req.body.product.seller;
          product.price = req.body.product.price;
          product.discountPrice = req.body.product.discountPrice;
          product.percentageOff = req.body.product.percentageOff;
          product.description = req.body.product.description;
          product.images = req.body.product.images;
          product.reviews = req.body.product.reviews;
          product.questionAndAnswers = req.body.product.questionAndAnswers;
          product
            .save()
            .then((update) => {
              res.status(200).json({
                status: "success",
                data: {
                  product: update,
                },
              });
            })
            .catch((err) => {
              return res.status(404).json({
                status: "fail",
                message: err.message,
              });
            });
        })
        .catch((err) => {
          return res.status(404).json({
            status: "fail",
            message: err.message,
          });
        });
    }
  }
);

// @route     DELETE /api/products/
// @desc      delete product
// @access    Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Products.findById(req.params.id).then((product) => {
      if (!product) {
        return next(new AppError("Product not found", 404));
      }
      product
        .delete()
        .then((product) => {
          res.status(200).json({
            status: "success",
            data: {
              product,
            },
          });
        })
        .catch((err) =>
          next(new AppError("Product not delete server error", 500))
        );
    });
  }
);

// route        POST /api/product/slider-image
// desc         Upload Slider Image
// access       Private
router.post(
  "/delete-slider-image",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let image = req.body.image;
    // await deleteImage(image, res);
    if (req.body.type === "DESKTOP") {
      const sliderImage = await Slider.findById(req.body.id);

      if (!sliderImage) {
        return res.status(400).json({
          status: "fail",
          message: "product not found",
        });
      }
      sliderImage.deskTopImage = sliderImage.deskTopImage.filter(
        (img) => img !== image
      );

      sliderImage.save().then((images) => {
        res.status(203).json({
          status: "success",
          data: null,
        });
      });
    } else if (req.body.type === "MOBILE") {
      const sliderImage = await Slider.findById(req.body.id);

      if (!sliderImage) {
        return res.status(400).json({
          status: "fail",
          message: "product not found",
        });
      }
      sliderImage.mobileImages = sliderImage.mobileImages.filter(
        (img) => img !== image
      );

      sliderImage.save().then((images) => {
        res.status(203).json({
          status: "success",
          data: null,
        });
      });
    }
    // req.body.imageArray.map(async image => {
    //    await deleteImage(image , res)
    //    newArray = array.filter(file => file !== image)
    // })
  }
);
// route        POST /api/product/slider-image
// desc         Upload Slider Image
// access       Private

router.post(
  "/slider-image",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.body.id) {
      const ImagesArray = await Slider.findById(req.body.id);
      (ImagesArray.deskTopImage = [
        ...ImagesArray.deskTopImage,
        ...req.body.images,
      ]),
        (ImagesArray.mobileImages = [
          ...ImagesArray.mobileImages,
          ...req.body.imagesMob,
        ]);
      ImagesArray.save().then((images) => {
        res.status(200).json({
          status: "success",
          data: {
            sliderImages: images,
          },
        });
      });
    } else {
      const newImages = new Slider({
        deskTopImage: req.body.images,
        mobileImages: req.body.imagesMob,
      });
      newImages.save().then((images) => {
        res.status(201).json({
          status: "success",
          data: {
            sliderImages: images,
          },
        });
      });
    }
  }
);

module.exports = router;
