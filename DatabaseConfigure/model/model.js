const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    client:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client'
    }]
})
const ClientSchema=mongoose.Schema({
    img:String,
    name:String,
    email:String,
    gst_id:String,
    password:String,
    contact_number:Number,
    pan_number:String,
    gst_in:String
})

const Client=mongoose.model('Client',ClientSchema)
const User=mongoose.model('User',UserSchema)
module.exports={
    Client,User
}
