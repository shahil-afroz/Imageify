import {registerUser,loginUser,userCredits, paymentRazorPay, verifyrazorpay} from "../controller/userController.js"
import express from "express";
import userAuth from "../middlwares/auth.js";
const userRouter=express.Router();
userRouter.post('/SignUP',registerUser);
userRouter.post('/LogIn',loginUser);
userRouter.get('/Credits',userAuth,userCredits);
userRouter.post('/pay-razor',userAuth,paymentRazorPay);
userRouter.post('/verify-razor',verifyrazorpay);



export default userRouter;