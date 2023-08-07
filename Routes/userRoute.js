import express from 'express'
import { addNewUser, getAllUsers, getUser, loginUser, updateUser, forgotPassword, verifyOtp, changePassword } from '../Controllers/userController.js'

const router = express.Router()

router.get('/',getAllUsers)
router.get('/:userID',getUser)
router.post('/signup',addNewUser)
router.post('/login',loginUser)
router.post('/forgot-password',forgotPassword)
router.put('/forgot-password',verifyOtp)
router.put('/change-password',changePassword)
router.put('/:userID',updateUser)

export const userRouter = router 
