//importing Module
const express=require("express")
const authValidate=require('./middleware/authJWT')
const app=express();
const bodyParser=require('body-parser')
const userRoute=require("./middleware/Users")
const clientRoute=require("./middleware/client")
//middleWare
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin',"Autherization")
    if(req.method==='OPTIONS'){
        res.setheader('Access-Control-Allow-Origin','GET , PUT ,PATCH, DELETE, POST')
    }
    next()   
})


app.use("/",userRoute);
app.use('/clients',authValidate,clientRoute)

//Route

//admin


//Listen
app.listen('2000',(req,res)=>{
    console.log('Server is Running at 2000');
})
