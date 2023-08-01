import { Questions } from "../Model/questionModel.js"
import mongoose, { ObjectId } from "mongoose"

export const getAllQuestions = async(req,res)=>{
    try {
        const question = await Questions.find()
        res.status(200).json(question)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

export const getQuestion = async(req,res)=>{
    try {
        const {questionID} = req.params
        const question = await Questions.findById(questionID)
        res.status(200).json(question)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

export const askNewQuestion = async(req,res)=>{
    try {
        const question = await Questions.create(req.body)
        res.status(200).json(question)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

export const updateAnswer = async(req,res)=>{
    try {
        const {questionID}= req.params
        const question = await Questions.findById(questionID)
        if(!question){
            throw Error("Question not found")
        }
        const newAnswer ={
            ...req.body,
            unique_id: new mongoose.Types.ObjectId(), 
            createdAt: new Date()
        } 
            
        await Questions.updateOne(
            {_id:req.params.questionID},
            {$set:{answers:[...question.answers,newAnswer]}}
        )
        res.status(201).json(newAnswer)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const updateQuestion = async(req,res)=>{
    try {
        const validId = mongoose.Types.ObjectId.isValid(req.params.questionID)
        if(!validId){
            throw Error("Id is not valid")
        }

        const question = await Questions.findById(req.params.questionID)
        if(req.body.type==="ques"){

            if(req.body.addViews){
                question.views++
            }
            if(req.body.incVote){
                question.votes++
            }
            if(req.body.decVote){
                question.votes--
            }
    
            await Questions.findByIdAndUpdate(req.params.questionID,{
                $set:{views:question.views, votes:question.votes}
            })
            res.status(201).json({msg:"Question modified"})
        } else if(req.body.type==="ans"){
            question.answers.forEach(ans=>{
                
                if(ans.unique_id.toString() === req.body.ans_id){
                    req.body.incVote ? ans.votes++ : ans.votes--
                }
            })

            await Questions.findByIdAndUpdate(req.params.questionID,{
                $set:{answers:question.answers}
            })
            res.status(201).json({msg:"Question modified"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
        console.log(error.message);
    }
}



