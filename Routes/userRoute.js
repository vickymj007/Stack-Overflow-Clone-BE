import express from 'express'
import { addNewUser, getAllUsers, getUser, loginUser } from '../Controllers/userController.js'

const router = express.Router()

router.get('/',getAllUsers)
router.get('/:userID',getUser)
router.post('/signup',addNewUser)
router.post('/login',loginUser)

export const userRouter = router 
