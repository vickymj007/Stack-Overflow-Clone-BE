import { User } from "../Model/userModel.js"
import bcrypt from 'bcrypt'

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
        const user = await User.findById(userID)
        if(!user){
            throw Error("User id is invalid")
        }
        user.name = req.body.name
        user.title = req.body.title
        user.country = req.body.country
        user.avatar_id = req.body.avatar_id
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({msg:error.message,stack:error.stack})
    }
}