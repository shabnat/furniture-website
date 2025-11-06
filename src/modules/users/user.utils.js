

export const generateOTP = ()=>{
  return Math.floor(100000+Math.random()*900000).toString();        
}

export const generateOTPExpiry= ()=>{
  const expiry = new Date();
  // otp valid for 10 min
  expiry.setMinutes(expiry.getMinutes()+10)
  return expiry
}