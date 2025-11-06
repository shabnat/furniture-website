import express from 'express'
import { loginUserController, registerUser, verifyEmailController,getUserProfile,updateUserProfile,logoutUserController } from './user.controller.js'
import {userAuth} from './userAuth.middleware.js'

const router = express.Router()


router.post('/signup',registerUser)
router.post('/verify-email', verifyEmailController)
router.post('/login',loginUserController)


router.get('/profile', userAuth   ,getUserProfile)
router.put('/profile',userAuth,updateUserProfile)

router.post('/logout',userAuth,logoutUserController)

export default router