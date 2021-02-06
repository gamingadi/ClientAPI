const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    // console.log("Token Recieved:-"+req.headers['authorization']);
    recievedToken=req.headers['authorization'].split(" ")
    console.log("Token Recieved:-"+recievedToken[1]);
    try{
    jwt.verify(recievedToken[1],process.env.JWT_KEY,(err,data)=>{
        if(err)
        throw err
        req.TokenData=data
        console.log(data)
    })    
    next()
}catch(err){
    res.json({
        error:{
            TokenError:err,
            massage:"Token Expire"
        }
    }).status(401)
    }
}