const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specificationSchema = Schema({
  productSpecification:{
    type:[
      {
        featureHeading:{
          type:String,
          
        },
        feature:[
          {
            featureName:{
              type:String,
              
            },
            featureDetail:{
                 type: String,
                 
              }
          }
        ]  

      }
    ]
  }
})
module.exports = ProductSpecification = mongoose.model('ProductSpecification' , specificationSchema)
