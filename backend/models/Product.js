const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  productTitle: {
    type: String,
    required: true,
    trim: true,
  },
  productNameForCard: {
    type: String,
    trim: true,
  },
  cardTopMessage: {
    type: String,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  seller: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  productTitleForURL: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  percentageOff: {
    type: Number,
  },
  currencySign: {
    type: String,
    default: "₹",
  },
  specification: {
    type: Schema.Types.ObjectId,
    ref: "ProductSpecification",
  },
  reviews: {
    type: [
      {
        reviewBy: {
          type: String,
        },
        review: {
          type: String,
        },
        ratting: {
          type: Number,
        },
      },
    ],
  },
  images: {
    type: [String],
  },
  questionAndAnswers: {
    type: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function () {
  this.productTitleForURL = this.productTitle.replace(/ /g, "-");
});
const Product = mongoose.model("products", productSchema);
module.exports = Product;
