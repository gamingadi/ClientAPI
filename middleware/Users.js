//Importing Module
let log=(x)=>console.log(x)
const express = require("express");
const mongoose = require("mongoose");
const Route = express.Router();
const authValidate=require('./auth')
const model = require("../DatabaseConfigure/model/model");
const valid = require("./validation");
const handleErr = require("../handleFun/errhandle");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//Connecting To MongoDB
const url = "mongodb://localhost:27017/ClientDB1";
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log("Server Connect SuccessFully");
  })
  .catch(() => {
    console.log("Failed to connect to DataBase");
  });
//Route
Route.get("/",(req, res) => {
  model.User.find((err,result)=>{
    res.json(result)
  }).select("email password")
   
});
Route.post('/login',async(req,res,next)=>{
  const User = await model.User.findOne({ email: req.body.email }); 
  if(User){
    const hash=User.password
    const plainPass=req.body.pass
    bcrypt.compare(plainPass,hash,(err,result)=>{
      if(err){
        return res.status(401).json({
          error:err,
          massage:'Auth failed'
        })
      }
      if(result){
       const token =jwt.sign({
          id:User.id,
          email:req.body.email
        },process.env.JWT_KEY,{
          expiresIn:'24h'
        })
        log(token)
        return res.status(200).json({
          message:'Auth Successfull ',
          token:token
        })
      }
    })
  }else{
    return res.json({
      error:{
        massage:"User Exist"
      }})
  }
})
Route.post("/signup", async (req, res) => {
  try {
    const Userexist = await model.User.exists({ email: req.body.email });
    if (!Userexist) {
      const NewUser = new model.User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.pass,10)
      })
      NewUser.save((err, result) => {
        if (err) handleErr(err);
        else handleErr("Account Created!!");
        res.json(result).status(201).end();
      });
    } else {
      handleErr("User Exist");
      return res.json({
        error:{
          massage:"User Exist"
        }
      }).end();
    }
  } catch (err) {
    handleErr(err);
  }
});
module.exports = Route;
