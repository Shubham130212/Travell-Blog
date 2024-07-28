const mongoose=require ('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        require:true
    }]

},{timestamps:true})

const User=mongoose.model('User',userSchema)
module.exports=User;