import express from "express";
import { askNewQuestion, getAllQuestions, getQuestion, updateAnswer, updateQuestion } from "../Controllers/questionsController.js";

const router = express.Router()


router.get('/',getAllQuestions)
router.get('/:questionID',getQuestion)
router.post('/',askNewQuestion)
router.patch('/:questionID',updateAnswer)
router.put('/:questionID',updateQuestion)


export const questionRouter = router