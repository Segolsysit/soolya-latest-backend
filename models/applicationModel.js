const mongoose = require("mongoose");

const Applicationschema = mongoose.Schema({
    FirstName:{
        type:String
    },
    LName:{
        type:String
    },
    Location:{
        type:String
    },
    Email:{
        type:String,
    },
    Phone:{
        type:Number,
        
    },
    Address:{
        type:String,
    },
    Gender:{
        type:String,
    },
    Language:{
        type:String,
    },
    DOB:{
        type:Date,
    },
    AAdhar:{
        type:Number,
    },
    AccNo:{
        type:Number,
    },
    BnkName:{
        type:String,
    },
    Ifsc:{
        type:String,
    },
    Education:{
        type:String,
    },
    JobTitle:{
        type:String,
    },
    WorkExp:{
        type:String,
    },
    Zone:{
        type:String,
    },
    AltPH:{
        type:Number,
    },
    KnownL:{
        type:String,
    },
    SkillExp:{
        type:String,
    },
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

});

module.exports = mongoose.model("vendorApplication" , Applicationschema)