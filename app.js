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

const uri = "mongodb+srv://luoy789:BrandeisSpr22@cosi103.ll4oj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})