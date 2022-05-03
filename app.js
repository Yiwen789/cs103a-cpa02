// libraries
const express = require('express')
const path = require("path"); 


const app = express()
const port = 3000


// app settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("home.ejs");
})

const mongoose = require( 'mongoose' );
const mongodb_URI = "mongodb+srv://luoy789:BrandeisSpr22@cosi103.ll4oj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect( mongodb_URI);
// fix deprecation warnings
// mongoose.set('useFindAndModify', false); 
// mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})