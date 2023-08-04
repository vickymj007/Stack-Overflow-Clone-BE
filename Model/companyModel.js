import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    name:String,
    location:String,
    business_type:String,
    description:String,
    tags:Array,
    img_url:String
})

export const Companies = mongoose.model('companies',companySchema)