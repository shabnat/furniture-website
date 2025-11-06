import User from "./user.model.js";
import jwt from "jsonwebtoken"

export const userAuth=async(req,res,next)=>{
   
  try {
    const {userToken}= req.cookies

    if(!userToken){
      return res.status(401).json({
        sucess:false,
        message:'User not Authorized',

      })
    }
    const tokenVerified = jwt.verify(userToken,process.env.JWT_SECRET)
    if (!tokenVerified) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(tokenVerified.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }


}