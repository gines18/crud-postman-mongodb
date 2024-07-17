const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/products", productRoute);
const MONGODB_URI='mongodb+srv://ruczkowskim:dKs6ItooSYP68CKw@cluster0.vxiugm8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
  });
  
  const User = mongoose.model('User', userSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "index.html"))
});

app.post('/submit', async (req, res) => {
  try {
    const {name, email} = req.body;
    const newUser = new User({ name, email});
    await newUser.save();
    res.send('Success!')
  } catch (error) {
    console.error('Error saving user to MongoDB', err);
    res.status(500).send('Error saving user to MongoDB');
  }

})

app.listen(3000);
