const mongoose = require("mongoose");


const vendorOrderSchema =new mongoose.Schema({
    user_email:{
        type:String
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    person:{
        type:String
    },
    number:{
        type:Number
    },
    // Service:{
    //     type:String
    // },
    Category:{
        type:String
    },
    price:{
        type:Number
    },
    paymentMethod:{
        type:String
    }
})

const pendingOderSchema =new mongoose.Schema({
    vendor_email:{
        type:String
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    person:{
        type:String
    },
    number:{
        type:Number
    },
    // Service:{
    //     type:String
    // },
    Category:{
        type:String
    },
    price:{
        type:Number
    },
    paymentMethod:{
        type:String
    },
    order_id:{
        type:String
    }
})

// const pendingOrders_Model = mongoose.model("pendingOrders_Model", pendingOderSchema)
const vendorOrder_Model = mongoose.model("vendorOrder_Model", vendorOrderSchema)

module.exports = {
    // pendingOrders_Model,
    vendorOrder_Model
}