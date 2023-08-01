import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

userModel.pre('save',async function (next){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    next()
})

export const User = mongoose.model('User',userModel)