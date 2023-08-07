import { User } from "../Model/userModel.js"
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import Mailgen from "mailgen"
import jsonwebtoken from 'jsonwebtoken'

export const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const getUser = async (req,res)=>{
    try {
        const {userID} = req.params
        const user = await User.findById(userID)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}


export const addNewUser = async (req,res)=>{
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            throw Error("Email or Password is required")
        }
        
        const user = await User.findOne({email})
        
        if(!user){
            throw Error("User not registered, Signup to continue")
        }
        
        const validPassword = await bcrypt.compare(password, user.password)
        
        if(!validPassword){
            throw Error("Password is incorrect")
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({msg:error.message,stack:error.stack})
    }
}

export const updateUser = async (req,res)=>{
    try {
        const {userID} = req.params
        const user = await User.findByIdAndUpdate(userID,{$set:req.body},{new:true})

        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({msg:error.message,stack:error.stack})
    }
}

export const forgotPassword = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({msg:"Email not registered"})
        }

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })

        const mailGenerator = new Mailgen({
            theme:"Default",
            product:{
                name:"Mailgen",
                link:"https://mailgen.js/"
            }
        })

        let OTP = Math.floor(1000 + Math.random() * 9000)

        const html = mailGenerator.generate({
            name:"",
            body:{
                intro:`OPT to change your password is ${OTP}`
            }
        })

        const info = await transporter.sendMail({
            from:process.env.EMAIL,
            to:req.body.email,
            subject:"Recover your account",
            html
        })

        OTP = OTP.toString()
        const jwtToken = jsonwebtoken.sign({OTP},process.env.JWT_SECRET_KEY,{expiresIn:'10m'})
        res.cookie("otp",jwtToken,{maxAge: 1000*60*10})
        res.status(200).json({msg:"OTP has been sent to your Email"})
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const verifyOtp = async (req,res)=>{
    try {
        jsonwebtoken.verify(req.cookies.otp,process.env.JWT_SECRET_KEY,(err,otp)=>{
            if(err){
                return res.status(401).json({msg:"Invalid OTP"})
            }
            if(otp.OTP !== req.body.otp){
                return res.status(401).json({msg:"Invalid OTP"})
            }
            res.status(200).json({msg:"Verified OTP"})
        })
    } catch (error) {
        res.status(401).json({msg:error.message})
    }
}

export const changePassword = async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(401).json({msg:"User not found"})
        }

        user.password = req.body.password
        await user.save()
        res.status(200).json({msg:"Password changed Successfully"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}