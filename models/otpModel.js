const mongoose = require('mongoose');

const otpModel = new mongoose.Schema({
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


// const otpModel = new mongoose.Schema({
//   mobile: { type: String, required: true },
//   otp: { type: String, required: true },
//   expiresAt: { type: Date, required: true }

  
// });

module.exports= mongoose.model('otpModel', otpModel);



