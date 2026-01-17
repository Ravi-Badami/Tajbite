require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

// Connect to Database
const connectDB = require('./config/db');
connectDB();

//middleware
app.use(express.json());//ALlow us to accept the JSON data in the body

app.use(cors());

app.get('/',(req,res)=>{
  res.send("APi is running...");
});

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})