import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay"
import transactionModel from "../models/transactionModel.js";


const registerUser=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            return res.json({sucess:false,message:'Missing Details'})
        }
// encrypt the password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        //now store password in database
        const userData={
    name,email,password:hashedPassword
        }
        const newUser=new userModel(userData);
        const user=await newUser.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
   res.json({sucess:true,token,user:{name:user.name}});
   
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}


const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
            if(!user){
                return res.json({sucess:false,message:'User Does not exist'})
            }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
      
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({sucess:true,token,user:{name:user.name}});

        }else{
            return res.json({sucess:false,message:'Invalid Credentials'})
        }

    } catch (error) {
            console.log(error);
        res.json({sucess:false,message:error.message})
    }
}


const userCredits=async (req,res)=>{
    try {
        const {userId}=req.body;
        const user=await userModel.findById(userId)
        res.json({sucess:true,credits:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}

const razorpayInstance=new Razorpay({
    key_id:"rzp_test_ooXCFvu3qodg1A",
    key_secret:"g3y40UpEvVKGNodzWFfuXstV"
})
const paymentRazorPay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        
  if(!userId){
    return res.json({ success: false, message: "Missing " });
  }
        if (!planId) {
            return res.json({ success: false, message: "Mis" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
     
        let credits, plan, amount;
        switch (planId) {
            case "Basic":
                plan = "Basic";
                credits = 100;
                amount = 10;
                break;
            case "Advanced":
                plan = "Advanced";
                credits = 500;
                amount = 50;
                break;
            case "Business":
                plan = "Business";
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Plan not found" });
        }

        const date = Date.now();
        const transactionData = { userId, plan, amount, credits, date };
        const newTransaction = await transactionModel.create(transactionData);
            
      
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error("Razorpay API keys are missing");
        }

        const options = {
            amount: amount * 100, 
            currency: "INR",
            receipt: newTransaction._id,
        };

       

        const order = await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log("error");
                return res.json({success:false,message:error})
            }
           
            res.json({ success: true, order});
        });
        
    } catch (error) {
        console.error("Razorpay Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const verifyrazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (!transactionData) {
                return res.status(404).json({ success: false, message: "Transaction not found" });
            }

            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment already processed" });
            }

            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const creditBalance = userData.creditBalance + transactionData.credits;

            await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            return res.json({ success: true, message: "Credits Added" });
        } else {
            return res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {registerUser,loginUser,userCredits,paymentRazorPay,verifyrazorpay};