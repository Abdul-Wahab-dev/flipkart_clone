const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  deskTopImage:{
    type:[String]
  },
  mobileImages:{
    type: [String],
  }
})

module.exports = Slider = mongoose.model('Slider' , sliderSchema)