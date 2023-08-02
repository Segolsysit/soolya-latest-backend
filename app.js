const express = require("express");
const  mongoose  = require("mongoose");
const app = express();
require('dotenv').config()
//vanakkam
// const router = require("./Router/Router")
const cors = require("cors");
const path = require("path");
const dburl = process.env.DB;
const url = process.env.PORT || 3002;
const cookieParser = require("cookie-parser")

const subcategory_router = require("./RouteFiles/subcategory_router");
const OtpDoneRoute = require("./RouteFiles/serviceDoneRoute");
// const service_router = require("./Router/service_route");
// const serviceman_route = require("./Router/serviceman_route");
const category_setup_Router =require("./RouteFiles/category_setup_Router");
const auth_router = require("./RouteFiles/authRoutes");
const Application_Router=require('./RouteFiles/Application_router');
const bookingdetails_router = require("./RouteFiles/bookingdetails_router");
// const cart_router = require("./Router/cart_router");
// const bookingdetails_router = require("./Router/bookingdetails_router");
const RejectedList_router = require("./RouteFiles/RejectedList_router");
const VendorAuthRoute = require("./RouteFiles/vendor_authRoute");
// const Footer_form_router = require("./Router/Footer_form_router");
// const feedback_api = require ("./Router/feedback")
const OtpRoute = require("./RouteFiles/Otp");
const vendor_orders_router = require("./RouteFiles/vendor_order_router copy");
// server.on("request", app)
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: "https://kooblu.com",
      methods: ["GET", "POST","PUT","DELETE","PATCH"],
      credentials: true
    })
  );
app.use("/api", category_setup_Router)
app.use("/booking_api",bookingdetails_router);
app.use("/vendororder_api",vendor_orders_router);
app.use("/authUser",auth_router); 
app.use('/vendor_Applications', Application_Router)
app.use("/vendor_Auth",VendorAuthRoute);
app.use("/sub_api", subcategory_router);
app.use("/doneOtp", OtpDoneRoute);
// app.use("/service_api", service_router )
// app.use("/serviceman",serviceman_route);
 
// app.use("/cart_api",cart_router);
// app.use("/booking_api",bookingdetails_router);
app.use("/reject_api",RejectedList_router);

// app.use("/footer_api",Footer_form_router);
// app.use("/feedback_api",feedback_api);
app.use("/OTP",OtpRoute);

app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "files&img")));



mongoose.set('strictQuery', true);
mongoose.connect(dburl,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("DB connected successfully");
    }
})



app.listen(url,(err) => {
    if(err){
        console.log(err);
    }
    

    else{
        console.log(`Server Started On ${url} Port`);
    }
})
