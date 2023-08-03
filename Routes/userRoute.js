import express from 'express'
import { addNewUser, getAllUsers, getUser, loginUser, updateUser } from '../Controllers/userController.js'

const router = express.Router()

router.get('/',getAllUsers)
router.get('/:userID',getUser)
router.post('/signup',addNewUser)
router.post('/login',loginUser)
router.put('/:userID',updateUser)

export const userRouter = router 
