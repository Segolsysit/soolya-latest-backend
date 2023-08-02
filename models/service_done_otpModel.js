const mongoose = require('mongoose');



const serviceDoneOtpModel = new mongoose.Schema({
  //   workLists: [{
  //       subCategory: String,
  //       price: String
  //     }],
  // total:{
  //   type:String,
  //   required:true
  // },
  phoneNumber: {
    type: String,
    unique: true ,
    trim: true,
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
  
});

const serviceDone_OtpModel = mongoose.model("serviceDoneotpModel", serviceDoneOtpModel) 

module.exports = {
  serviceDone_OtpModel
}