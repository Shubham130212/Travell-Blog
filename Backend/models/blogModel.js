const mongoose=require('mongoose')
const {Schema}=mongoose

const blogSchema=new Schema({
    title:{
       type:String,
       require:true 
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
}, {timestamps:true})

const Blog=mongoose.model('Blog',blogSchema)
module.exports=Blog; 
