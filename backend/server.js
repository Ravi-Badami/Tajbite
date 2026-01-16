const express=require("express");
const app=express();

app.get('/',(req,res)=>{
  res.send("This is the working");
})

app.listen(5000);