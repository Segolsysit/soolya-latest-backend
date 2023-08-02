const Application_Router = require("express").Router();
const Applicationschema = require("../models/applicationModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");




const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
  
  cb(null , "files&img")
  
    },
    filename:(req,file,cb)=>{
          cb(null,file.originalname + "_"+Date.now() + path.extname(file.originalname))  
    }
  })
  
  
  const fileFilter = (req, file, cb) => {
    const acceptFileTypes = ['image/jpeg', 'image/jpg', 'image/png','file/pdf']
    if (acceptFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
  }
  
  const upload = multer({
    storage:Storage,
    fileFilter: fileFilter
  })

  var multipleUpload = upload.fields([{ name: 'AadharCard' }, { name: 'PanCard' },{name:'Photo'}])



Application_Router.post("/Applications",multipleUpload,async(req,res) => {
    try {
        const{FirstName,LName,Location,Email,Phone,Address,Gender,Language,DOB,AAdhar,AccNo,BnkName,Ifsc,Education,JobTitle,WorkExp,Zone,AltPH,KnownL}=req.body
        const AadharCard=req.files['AadharCard']
        const PanCard=req.files['PanCard']
        const Photo=req.files['Photo']
    
    
        const fileData=new Applicationschema({
          FirstName,LName,Location,Email,Phone,Address,Gender,Language,DOB,AAdhar,AccNo,BnkName,Ifsc,Education,JobTitle,WorkExp,Zone,AltPH,KnownL,
          AadharFiles:[],
          PhotoFiles:[],
          PanFiles:[]
    
        })
    
        if (AadharCard){
          AadharCard.forEach(element => {
            const file = {
              fieldName: 'AadharCard',
              filename:element.filename,
              originalName: element.originalname,
              mimeType: element.mimetype,
              path: element.path,
            };
            fileData.AadharFiles.push(file);
          });
        }
    
        if (Photo){
          Photo.forEach(element => {
            const file = {
              fieldName: 'Photo',
              filename:element.filename,
              originalName: element.originalname,
              mimeType: element.mimetype,
              path: element.path,
            };
            fileData.PhotoFiles.push(file);
          });
        }
    
        if (PanCard){
          PanCard.forEach(element => {
            const file = {
              fieldName: 'PanCard',
              filename:element.filename,
              originalName: element.originalname,
              mimeType: element.mimetype,
              path: element.path,
            };
            fileData.PanFiles.push(file);
          });
        }
    
        const isEmail = await Applicationschema.findOne({ Email });
        const isPhone = await Applicationschema.findOne({ Phone });
        if (isEmail||isPhone) {
          console.log("Email/Ph.No is already registered");
          res.json({ status: "error", message: "Email/Mobilenum is already registered" });
        } else {
          
         await fileData.save()
          res.json({ status: "success", message: "signup successfull" });
        }
    
    
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: "Something went wrong" });
      }
})

Application_Router.get("/vendor_application",async(req,res) => {
    const vendorData = await Applicationschema.find();
     res.json(vendorData)
 })
 
 Application_Router.get("/fetchVendor_id/:id",async(req,res) => {
    const vendorData = await Applicationschema.findById(req.params.id);
     res.json(vendorData)
 })

 Application_Router.delete("/delete_item/:id",async(req,res)=>{
    // const vendorData = await Applicationschema.findById(req.params.id)
    // await fs.unlink(vendorData.path,((err)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("removed del file");
    //     }
    // }));
     await Applicationschema.findByIdAndDelete(req.params.id)
     return res.json('Deleted')
})
 
module.exports=Application_Router;