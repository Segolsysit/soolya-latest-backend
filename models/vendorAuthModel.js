const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

    const VendorAuth = new mongoose.Schema({
         Username:String,
        Email:String,
        Password:String,
        Phonenumber:Number,
        Location:String,
        Gender:String,
        Language:String,
        DOB:Date,
        AAdhar:Number,
        AccNo:Number,
        BnkName:String,
        Ifsc:String,
        Education:String,
        JobTitle:String,
        WorkExp:String,
        Zone:String,
        AltPH:Number,
        KnownL:String,
        SkillExp:String,
        
         AadharFiles: [{
        fieldName: String,
        filename:String,
        originalName: String,
        mimeType: String,
        path: String,
        
      }],
       PhotoFiles: [{
        fieldName: String,
        filename:String,
        originalName: String,
        mimeType: String,
        path: String,
        
      }],
       PanFiles: [{
        fieldName: String,
        filename:String,
        originalName: String,
        mimeType: String,
        path: String,
        
      }],
    })
    
    module.exports = mongoose.model("VendorAuth" , VendorAuth);


  

module.exports = mongoose.model("VendorAuth" , VendorAuth)