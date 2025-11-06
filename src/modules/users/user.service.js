import { generateUserToken } from "../utils/token.js";
import { sendVerificationEmail } from "./user.email.js";
import User from "./user.model.js";
import { generateOTP, generateOTPExpiry } from "./user.utils.js";
import bcrypt from "bcrypt";


// user signup
export const createUser = async (data) => {
  const { name, email, password, phone,profilePic } = data;
  // check if user already exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("user already exist");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOTP();
  const otpExpiry = generateOTPExpiry();
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    profilePic,
    emailVerificationOTP: otp,
    otpExpiry,
  });
  await sendVerificationEmail(email, otp);
  return newUser;
};


// verify-email
export const verifyEmail = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not found");
  }
  if (user.isEmailVerified) {
    throw new Error("Email is already verified");
  }
  if (user.emailVerificationOTP !== otp) throw new Error("Invalid OTP");

  if (user.otpExpiry < new Date()) throw new Error("OTP expired");

  user.isEmailVerified = true;
  user.emailVerificationOTP = null;
  user.otpExpiry = null;
  await user.save();

};

// user login 

export const loginUser= async(email,password)=>{

  // check if user exists
  const user = await User.findOne({email}).select("+password")
  if(!user){
    throw new Error('User not found ')
  }
  
  // check if email verified
  if(!user.isEmailVerified){
    throw new Error('Please Verify your email before logging in')
  }

// check password
const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
  throw new Error('invalid password')
}

// generate jwt token
const token = generateUserToken(user._id,user.role)

return {
  token,
  user:{
    id:user._id,
    name:user.name,
    email:user.email,
    role:user.role,
  }
}

}

// get user profile

export const getUserProfileService = async(userId)=>{
  const user = await User.findById(userId).select('-password -emailVerificationOTP')
  if(!user){
    throw new Error ('User not found')
}
return user
}

// update profile

export const updateUserProfileService =async(userId, updateData)=>{
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true } // return updated doc, validate fields
  ).select("-password -emailVerificationOTP");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
  


}

// logout

export const logoutUserService = async () => {
  
  return { message: "Logged out successfully" };
};