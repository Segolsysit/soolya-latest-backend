const mongoose = require("mongoose");


const bookingdetailSchema = new mongoose.Schema({
    user_email: {
        type: String
    },
    address: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number
    },
    person: {
        type: String
    },
    number: {
        type: Number
    },
    // Service: {
    //     type: String
    // },
    Category: {
        type: String
    },
    price: {
        type: Number
    },
    paymentMethod: {
        type: String
    }
})

const pendingOderSchema = new mongoose.Schema({
    vendor_email: {
        type: String
    },
    vendor_name:{
        type: String
    },
    user_email: {
        type: String
    },
    address: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number
    },
    person: {
        type: String
    },
    number: {
        type: Number
    },
    // Service:{
    //     type:String
    // },
    Category: {
        type: String
    },
    price: {
        type: Number
    },
    paymentMethod: {
        type: String
    }
})


const CompletedOderSchema = new mongoose.Schema({
    vendor_email: {
        type: String
    },
    vendor_name:{
        type: String
    },
    user_email: {
        type: String
    },
    address: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number
    },
    person: {
        type: String
    },
    number: {
        type: Number
    },
    // Service:{
    //     type:String
    // },
    Category: {
        type: String
    },
    price: {
        type: Number
    },
    paymentMethod: {
        type: String
    },
    // workLists: [{
    //     subCategory: String,
    //     price: String
    // }],
    // total: {
    //     type: String,
    //     required: true
    // },
})

const pendingOrders_Model = mongoose.model("pendingOrders_Model", pendingOderSchema)
const bookingdetails_Model = mongoose.model("bookingdetails_Model", bookingdetailSchema)
const CompletedOder_Model = mongoose.model("CompletedOder_Model", CompletedOderSchema)

module.exports = {
    pendingOrders_Model,
    bookingdetails_Model,
    CompletedOder_Model
}