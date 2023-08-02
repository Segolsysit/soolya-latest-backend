const OtpDoneRoute = require("express").Router();
const {serviceDone_OtpModel} = require("../models/service_done_otpModel");
const TwoFactor = require('2factor');
const twoFactor = new TwoFactor('8264f349-2231-11ed-9c12-0200cd936042');
const jwt = require('jsonwebtoken');
const secret = 'soolya secret magic key';

OtpDoneRoute.post('/service-done-otp', async (req, res) => {
    const {  phoneNumber } = req.body;

    try {
      const formattedPhoneNumber = phoneNumber.toString().replace(/\D/g, '').slice(-10);
      if (!/^\d{10}$/.test(formattedPhoneNumber)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
      }
  
      let data = await serviceDone_OtpModel.findOne({ phoneNumber });
      const otp = Math.floor(100000 + Math.random() * 900000);
      const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
       // remove all non-digits and take the last 10 digits
  
      if (data && data.expiresAt > new Date()) {
        // The user already has an OTP that is valid
        data.otp = otp;
        data.expiresAt = expiryTime;
      } else {
        data = new serviceDone_OtpModel({
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
            const result = await serviceDone_OtpModel.deleteOne({ formattedPhoneNumber });
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
  
  });
  
  OtpDoneRoute.post('/verifyotp', async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    try {
      // if (!/^\d{10}$/.test(phoneNumber)) {
      //   return res.status(400).json({ message: 'Invalid phone number format' });
      // }
  
      // const formattedPhoneNumber = phoneNumber.toString().replace(/\D/g, '').slice(-10); // remove all non-digits and take the last 10 digits
  
      let data = await serviceDone_OtpModel.findOne({ phoneNumber });
      if (!data || data.expiresAt < new Date()) {
        return res.status(400).json({ message: 'OTP expired or not sent yet' });
      }
  
      if (data.otp != otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // If we reach this point, the OTP is valid and can be deleted
      const result = await serviceDone_OtpModel.deleteOne({ phoneNumber });
      console.log(`Deleted ${result.deletedCount} OTP for ${phoneNumber}`);
  
      res.json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  // OtpDoneRoute.post('/worklist', async(req,res) =>{
  //   try{
  //     const{workLists,total,user_email} = req.body;

  //     const newserviceDone_OtpModel = new workDone_Model({
  //       workLists,
  //       total,
  //       user_email
  //     });

  //      await newserviceDone_OtpModel.save()
  //     res.status(200).json(newserviceDone_OtpModel);
  //   }catch (error){
  //     console.log(error);
  //     res.status(500).send(error)
  //   }
  // });
  

  OtpDoneRoute.get('/WorkafterOTP/:user_email',async(req,res)=>{
    const user_email=req.params.user_email
    const data= await workDone_Model.find({user_email:user_email})
    res.json(data)
  })
  

module.exports = OtpDoneRoute;