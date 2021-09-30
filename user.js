import mongoose from "mongoose";

const User =new mongoose.Schema({
    name:{type:String, unique:true, required: true},
    email:{type:String, required: true},
    password:{type:String, required: true},
    roles:[{type: String, ref: 'Role', select: false}]
})

export default mongoose.model('User', User)