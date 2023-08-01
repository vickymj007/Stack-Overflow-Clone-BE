import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title:String,
    question:String,
    tags:Array,
    votes:{
        type:Number,
        default: 0
    },
    views:{
        type:Number,
        default: 0
    },
    askedBy:Object,
    answers:Array
},{timestamps:true})

export const Questions = mongoose.model("Question", questionSchema)