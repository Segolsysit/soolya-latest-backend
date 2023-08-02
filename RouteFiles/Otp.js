// server/routes/api.js
const OtpRoute = require("express").Router();
const otpModel = require("../models/otpModel");
const jwt = require('jsonwebtoken');
const secret = 'soolya secret magic key';
const TwoFactor = require('2factor');
const twoFactor = new TwoFactor('8264f349-2231-11ed-9c12-0200cd936042');


OtpRoute.post('/sendotp', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const formattedPhoneNumber = phoneNumber.toString().replace(/\D/g, '').slice(-10);
    if (!/^\d{10}$/.test(formattedPhoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    let data = await otpModel.findOne({ phoneNumber });
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiryTime = new Date(Date.now() + 1 * 60 * 1000);
     // remove all non-digits and take the last 10 digits

     if (data && data.expiresAt > new Date()) {
      return res.status(400).json({ message: 'OTP already sent, please wait for the previous OTP to expire' });
    }


    if (data) {
      // The user already has an OTP that is valid
      data.otp = otp;
      data.expiresAt = expiryTime;
    } else {
      data = new otpModel({
        phoneNumber: formattedPhoneNumber,
        otp:otp,
        expiresAt: expiryTime
      });
    }

    twoFactor.sendOTP(formattedPhoneNumber, { otp: otp })
      .then(async (response) => {
        try {
          await data.save();
        } catch (err) {
          if (err.code === 11000) {
            return res.status(400).json({ message: 'OTP already sent, please wait for the previous OTP to expire' });
          }
          throw err;
        }

        setTimeout(async () => {
          //const result = await DoneOtpModel.deleteOne({ formattedPhoneNumber });
          const result = await otpModel.deleteOne({ formattedPhoneNumber });
          console.log(result);
          console.log(`Deleted ${result.deletedCount} OTP for ${formattedPhoneNumber}`);
        }, expiryTime - Date.now());
        res.json({ message: 'OTP sent successfully', response });
      }).catch((error) => {
        console.error(error);
        return res.status(400).json({ message: 'Invalid Phone Number - Check Number Format' });
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }


  // try {
  //   if (!/^\d{10}$/.test(phoneNumber)) {
  //     return res.status(400).json({ message: 'Invalid phone number format' });
  //   }

  //   const data = await otpModel.findOne({ phoneNumber });
  //   if (data && data.expiresAt > new Date()) {
  //     // The user already has an OTP that is valid
  //   return res.json({message:'An OTP has already been sent to this number'});
  //   }

  //   const otp = Math.floor(100000 + Math.random() * 900000);
  //   const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
  //   const formattedPhoneNumber = phoneNumber.toString().replace(/\D/g, '').slice(-10); // remove all non-digits and take the last 10 digits

  //   twoFactor.sendOTP(formattedPhoneNumber,{otp: otp})
  //   .then((response) => {
  //     const OTP = new otpModel({
  //       phoneNumber:formattedPhoneNumber,
  //       otp,
  //       expiresAt: expiryTime
  //     });
  //     OTP.save();
  //     setTimeout(async () => {
  //       const result = await otpModel.deleteOne({ phoneNumber });
  //       console.log(result);
  //       console.log(`Deleted ${result.deletedCount} OTP for ${phoneNumber}`);
  //     }, expiryTime - Date.now());
  //     res.json({message:'OTP sent successfully',response});
  //   }).catch((error) => {
  //     console.error(error);
  //     return res.status(400).json({ message: 'Invalid Phone Number - Check Number Format' });
  //   });
    
  // } catch (error) {
   
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }

});

OtpRoute.post('/verifyotp', async (req, res) => {
  const { phoneNumber, otp } = req.body;
  const formattedPhoneNumber = phoneNumber.toString().replace(/\D/g, '').slice(-10);
  try {
    const expiryTime = new Date(Date.now() + 1 * 60 * 1000);

    let data = await otpModel.findOne({ phoneNumber });
    if (!data || data.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired or not sent yet' });
    }

    if (data.otp != otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // If we reach this point, the OTP is valid and can be deleted
    // const result = await otpModel.deleteOne({ phoneNumber });
    // console.log(`Deleted ${result.deletedCount} OTP for ${phoneNumber}`);
    setTimeout(async () => {
      //const result = await DoneOtpModel.deleteOne({ formattedPhoneNumber });
      const result = await otpModel.deleteOne({ formattedPhoneNumber });
      console.log(result);
      console.log(`Deleted ${result.deletedCount} OTP for ${formattedPhoneNumber}`);
    }, expiryTime - Date.now());
    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // try {
  //   const data = await otpModel.findOne({ phoneNumber, otp });
    
  //   if (data && data.expiresAt > new Date()) {
  //     // OTP is valid and not expired
  //     const payload = {
  //      id: data._id,
  //     phoneNumber:data.phoneNumber
  //     };
      
  //     const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  //      res.cookie("otpToken", token, {
  //        withCredentials: true,
  //        httpOnly: false,
  //      });
  //     res.json({ message: 'OTP verified successfully' });
      
  //   } else {
  //     // OTP is invalid or expired
  //     const now = new Date();
  //     await otpModel.deleteMany({ expiresAt: { $lte: now }})
  //     res.status(400).json({message:'Invalid or expired OTP'});
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json('Internal server error');
  // }
});

// 2factor password=533576
module.exports = OtpRoute;