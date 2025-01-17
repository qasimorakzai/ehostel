const mongoose =require("mongoose");
const connectDb = mongoose.connect("mongodb://localhost:27017/eHostel")
.then(()=>console.log("connected the MongoDB"))
.catch(()=>console.log("MongoDB connection Failed"));

module.exports =connectDb;