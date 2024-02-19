require('dotenv').config();
const mongoose = require("mongoose");

const uri = "mongodb+srv://club_web:1234@cluster0.bkkzkne.mongodb.net/?retryWrites=true&w=majority"; // replace with your actual MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;

