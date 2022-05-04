// libraries
const express = require('express')
const path = require("path"); 
const layouts = require("express-ejs-layouts");

const debug = require("debug")("personalapp:server"); 


const app = express()
// const port = 3000

// *********************************************************** //
//  Loading models
// *********************************************************** //
const Company = require("./models/Company");
const Coupon = require('./models/Coupon');
let dotenv = require('dotenv').config();
console.log(dotenv);


// app settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// this allows us to use page layout for the views 
// so we don't have to repeat the headers and footers on every page ...
// the layout is in views/layout.ejs
// app.use(layouts);


// Connecting Data
const mongoose = require( 'mongoose' );
// const mongodb_URI = 'mongodb://localhost:27017/myapp';
// const mongodb_URI = process.env.mongodb_URI;

const mongodb_URI = 'mongodb+srv://luoy789:BrandeisSpr22@cosi103.ll4oj.mongodb.net/cpa02_coupon_launchpad?retryWrites=true&w=majority;';

mongoose.connect( mongodb_URI);
// fix deprecation warnings
// mongoose.set('useFindAndModify', false); 
// mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});

app.get('/', async(req, res) => {
  const saved_coupons = await Coupon.find({saved: "true"});
  // console.log(saved_coupons);
  res.locals.saved_coupons = saved_coupons;
  res.render("home.ejs");
})

app.get('/stores', async(req, res, next) => {
    try{
      // console.log("hi");
      // const companies = await Company.find();  // get the user's id

      const list = ["Hold Food",
      "Trader Jenny", "Hannahfour Supermarket", "Market Basketball", "Happy Bakery", "Walblue", "CWS", "Moon Market"];
      

      
      res.locals.companies = list;
      // console.log(res.locals.companies);

      // console.log(companies_data);
      // console.log(companies);
      res.render("company.ejs");  
    } catch (e){
      next(e);
    }
})

app.get('/coupons', async(req, res, next) => {
  try{
    const coupons = await Coupon.find();
    res.locals.coupons = coupons;
    
    res.render("coupon.ejs");
  } catch(e) {
    next(e);
  }
}) 

app.get('/coupons/:storeName', async(req, res, next) => {
  try {
    const storeName = req.params.storeName;
    console.log(req.params.storeName);
    const coupons = await Coupon.find({company: storeName})
    res.locals.coupons = coupons;
    console.log(coupons);
    res.render("coupon.ejs");
  } catch(e) {
    next(e);
  }
}) 

app.get('/home/add/:couponId', async(req, res, next) => {
  try{
    const couponId = req.params.couponId;
    await Coupon.findOneAndUpdate({_id: couponId}, {saved: "true"})

    // const newItem = await Coupon.find({coupon: couponId})
    
    const saved_coupons = await Coupon.find({saved: "true"})
    res.locals.saved_coupons = saved_coupons;
    // console.log(saved_coupons);
    res.render('home.ejs');
  } catch(e) {
    next(e);
  }
})

const port = "3000";
app.set("port", port);

// and now we startup the server listening on that port
const http = require("http");
const { time } = require("console");
const server = http.createServer(app);

server.listen(port);
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}


server.on("error", onError);

server.on("listening", onListening);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app;
