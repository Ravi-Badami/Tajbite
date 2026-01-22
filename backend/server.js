require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dishRoutes=require("./routes/dishRoutes")
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./config/swagger');
const errorHandler=require('./middleware/errorHandler');
const restaurantRoutes=require('./routes/restaurantRoutes');
const carouselRoutes=require('./routes/carouselRoutes');

const app=express();

// Connect to Database
const connectDB = require('./config/db');
connectDB();

//middleware
app.use(express.json());//ALlow us to accept the JSON data in the body

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
const corsoptions={
  origin:process.env.NODE_ENV==='production' ? 'https://tajbite.vercel.app/' : 'http://localhost:5173',
  credentials:true
}

app.use(cors(corsoptions));

app.use('/api/dishes',dishRoutes);
app.use('/api/restaurants',restaurantRoutes);
app.use('/api/carousel',carouselRoutes);
app.use(errorHandler);

app.get('/',(req,res)=>{
  res.send("APi is running...");
});

const PORT=process.env.PORT||5000;
const ENV=process.env.NODE_ENV||'development'
if(ENV==="development"){
  console.log("Development Mode");
}

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})