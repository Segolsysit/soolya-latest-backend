const RejectedList_router = require("express").Router();
const RejectedListSchema = require("../models/rejected_list_schema");

RejectedList_router.post("/new_rejection", async (req, res) => {
    const deatails = new RejectedListSchema({
        Category: req.body.Category,
        Location: req.body.Location,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone,
        Address: req.body.Address,
        Email: req.body.Email
    })
    await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})
})

RejectedList_router.get("/rejected_data",async(req,res)=>{
    const booking_data = await RejectedListSchema.find()
    res.json(booking_data)
})

RejectedList_router.get("/rejected_data/:id",async(req,res)=>{
    const item_by_id = await RejectedListSchema.findById(req.params.id)
    res.json(item_by_id )
})

RejectedList_router.delete("/delete_item/:id",async(req,res)=>{
    await RejectedListSchema.findByIdAndDelete(req.params.id)
    return res.json('Deleted')
})

module.exports = RejectedList_router;