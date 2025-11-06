
import { signupValidation } from "./user.userValidation.js"

import { createUser, getUserProfileService, loginUser, verifyEmail ,updateUserProfileService,logoutUserService} from "./user.service.js"

export const registerUser =async (req,res)=>{
 
try {
  // validate input
  signupValidation(req)

  const user = await createUser(req.body)
  res.status(201).json({
    success:true,
    message:'signup succesfull,please verify your email'
  })

} catch (error) {
  res.status(400).json({
    success:false,
    message:error.message
  })
}


}

export const verifyEmailController = async(req,res)=>{
  try {
      const {email,otp} = req.body

     const message= await verifyEmail(email,otp)
     res.status(200).json({sucess:true,message:'Email verified successfully'})
  } catch (error) {
    res.status(400).json({sucess:false,message:error.message})
  }
}

export const loginUserController = async (req,res)=>{
   

  try {
    
    const {email,password}=req.body
    if(!email ||!password){
      throw new Error('Email and Password are required')
    }
    const{token,user}=await loginUser (email,password)
    
    res.cookie("userToken", token, {
      httpOnly: true,        
      secure: false,        
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });



    res.status(200).json({success:true,message:'Login successfull'})
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
  }
}


export const getUserProfile= async(req,res)=>{


  try {
    const user =await getUserProfileService(req.user._id)
    res.status(200).json({success:true,data:user})
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
  }
}


export const updateUserProfile=async(req,res)=>{
  try {
        const updatedUser = await updateUserProfileService(req.user._id,req.body)

        res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          data: updatedUser,
        });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// logout
export const logoutUserController= async(req,res)=>{
try {
  const result =  await logoutUserService()
  res.clearCookie('userToken',{
    httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
  })
  
  res.status(200).json({
    success: true,
    message: result.message,
  });


} catch (error) {
  res.status(400).json({
    success: false,
    message: error.message,
  });
}
}