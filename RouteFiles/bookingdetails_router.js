const bookingdetails_router = require("express").Router();
const {bookingdetails_Model,pendingOrders_Model,CompletedOder_Model} = require("../models/bookingdetails_schema");
// const  objectId = require('mongoose').isObjectIdOrHexString()
// const { ObjectId } = require('mongodb');

// An existing valid ObjectId value
// const existingId = new ObjectId('6147dd3f670d952b7a8cfc90');

bookingdetails_router.post("/new_booking", async (req, res) => {

    const deatails = new bookingdetails_Model({
        user_email:req.body.user_email,
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        person: req.body.person,
        number: req.body.number,
        // Service: req.body.Service,
        Category: req.body.Category,
        price: req.body.price,
        paymentMethod:req.body.paymentMethod
    })
    await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})
})

bookingdetails_router.post("/pending_orders/:id", async (req, res) => {
    
    const deatails = new pendingOrders_Model({
        vendor_email:req.body.vendor_email,
        vendor_name:req.body.vendor_name,
        user_email:req.body.user_email,
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        person: req.body.person,
        number: req.body.number,
        Service: req.body.Service,
        Category: req.body.Category,
        price: req.body.price,
        paymentMethod:req.body.paymentMethod
    })

   await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})

    

})

bookingdetails_router.post("/Completed_orders/:id", async (req, res) => {
    const{workLists,total} = req.body;
    const deatails = new CompletedOder_Model({
        vendor_email:req.body.vendor_email,
        vendor_name:req.body.vendor_name,
        user_email:req.body.user_email,
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        person: req.body.person,
        number: req.body.number,
        Service: req.body.Service,
        Category: req.body.Category,
        price: req.body.price,
        paymentMethod:req.body.paymentMethod,
        // workLists,
        // total
    })

   await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})
})

bookingdetails_router.patch("/edit_Completed_orders/:id", async (req, res) => {
    const{workLists,total} = req.body;
    const deatails = await CompletedOder_Model.findByIdAndUpdate(req.params.id)
    deatails.vendor_email=req.body.vendor_email,
    deatails.vendor_name=req.body.vendor_name,
    deatails.user_email=req.body.user_email,
    deatails.address= req.body.address,
    deatails.street= req.body.street,
    deatails.city= req.body.city,
    deatails.zip= req.body.zip,
    deatails.person= req.body.person,
    deatails.number= req.body.number,
    deatails.Service= req.body.Service,
    deatails.Category= req.body.Category,
    deatails.price= req.body.price,
    deatails.paymentMethod=req.body.paymentMethod,
    deatails.workLists=workLists,
    deatails.total=total
    

   await deatails.save();
    res.status(200).json({message:"File Updated",deatails})
})

bookingdetails_router.get("/pending_booking_data/:vendor_email",async(req,res)=>{
    const vendor_email = req.params.vendor_email;
    const item_by_id = await pendingOrders_Model.find({vendor_email:vendor_email})
    res.json(item_by_id )
})

bookingdetails_router.get("/pending_book/:user_email",async(req,res)=>{
    const user_email = req.params.user_email;
    const item_by_id = await pendingOrders_Model.find({user_email:user_email})
    res.json(item_by_id )
})

bookingdetails_router.get("/pending_booking_data",async(req,res)=>{
    const booking_data = await pendingOrders_Model.find()
    res.json(booking_data )
})

bookingdetails_router.get("/completed_booking_data",async(req,res)=>{
    const booking_data = await CompletedOder_Model.find()
    res.json(booking_data )
})

bookingdetails_router.get("/booking_data",async(req,res)=>{
    const booking_data = await bookingdetails_Model.find()
    res.json(booking_data)
})

bookingdetails_router.get("/booking/:_id",async(req,res)=>{
    try{
        const booking_data = await bookingdetails_Model.findById(req.params._id)
        res.json(booking_data)
    }catch(err){
        res.json(err)
    }

})



bookingdetails_router.get("/booking_data/:user_email",async(req,res)=>{
    const user_email = req.params.user_email;
    const item_by_id = await bookingdetails_Model.find({user_email:user_email})
    res.json(item_by_id )
})

bookingdetails_router.get("/Completed_order/:user_email",async(req,res)=>{
    const user_email = req.params.user_email;
    const item_by_id = await CompletedOder_Model.find({user_email:user_email})
    res.json(item_by_id )
})

bookingdetails_router.get("/Completed_vendor_order/:vendor_email",async(req,res)=>{
    const vendor_email = req.params.vendor_email;
    const item_by_id = await CompletedOder_Model.find({vendor_email:vendor_email})
    res.json(item_by_id )
})

bookingdetails_router.get("/Completed_vendor_order",async(req,res)=>{
    // const vendor_email = req.params.vendor_email;
    const item_by_id = await CompletedOder_Model.find()
    res.json(item_by_id )
})

bookingdetails_router.get("/Completed_billing/:id",async(req,res)=>{
    const booking_data = await CompletedOder_Model.findById(req.params.id)
    res.json(booking_data)
})

bookingdetails_router.delete("/delete_item/:id",async(req,res)=>{
    await bookingdetails_Model
    .findByIdAndDelete(req.params.id)
    return res.json('Deleted')
})

// bookingdetails_router.delete("/delete_item/:id",async(req,res)=>{
//     await pendingOrders_Model
//     .findByIdAndDelete(req.params.id)
//     return res.json('Deleted')
// })

bookingdetails_router.delete("/delete_pending_item/:id",async(req,res)=>{
    await pendingOrders_Model
    .findByIdAndDelete(req.params.id)
    return res.json('Deleted')
})

module.exports = bookingdetails_router;