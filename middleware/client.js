const express=require('express')
const handleErr=require('../handleFun/errhandle')
const model=require('../DatabaseConfigure/model/model')
const { query } = require('express')
const route=express.Router()


route.get('/',async(req,res)=>{
    try {
        const clients=await model.User.findOne({email:req.TokenData.email}).select('client').populate('client')
        if(clients){
            let query = Object.keys(req.query).length
            if(query){
                console.log("Query Length "+query)
                console.log(req.query)
                const client=await model.Client.find(req.query)
                console.log(client)
                if(client.length){
                    return res.json({
                        path:req.originalUrl,
                        email:req.TokenData.email,
                        data:client
                    })
                }else{
                    return res.json({
                        error:{
                            message:"Client Not Found",
                            query:req.query
                        }
                    })
                }
            }else{
                return res.json({
                    path:req.originalUrl,
                    email:req.TokenData.email,
                    data:clients
                })
            }
        }else{
            return res.json({
                error:{
                    message:"Client Not Found",
                    query:req.query
                }
                }) 
           } 
           
    } catch (error) {
        handleErr(error)
    }
})
route.post('/',async(req,res)=>{
    const User=await model.User.findOne({email:req.TokenData.email}).catch((err)=>{
        console.log(err)
    })
    if(User){
        const Newclient=new model.Client({
            img:req.body.img,
            name:req.body.name,
            email:req.body.email,
            gst_id:req.body.gst_id,
            password:req.body.password,
            contact_number:req.body.number,
            pan_number:req.body.pan_number,
            gst_in:req.body.gst_in
        })
        Newclient.save((err,result)=>handleErr(result))
        User.client.push(Newclient.id)
        User.save()
        res.json({
            message:"Client add successfully",
            email:req.params.email
        }).status(200)
    }else{
        return res.json({
            error:{
                status:404,
                message:"Email not Exist"
            }
        }).status(400)
    }
    
})
module.exports=route