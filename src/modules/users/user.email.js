import nodemailer from 'nodemailer'

export const sendVerificationEmail = async(email,otp)=>{
  const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      // USER GMAIL ID
      user:process.env.EMAIL_USER, 
      pass:process.env.EMAIL_PASS,
    }
  })

 const mailOptions ={
  from :`"Multiwood Furniture " <${process.env.EMAIL_USER}>`,
  to:email,
  subject :'Email verification OTP',
  html:`<p>Your verification OTP IS <b>${otp}</b> . It expires in 10 minutes.</p>`
 }

await transpoter.sendMail(mailOptions);
console.log('verification mail send to',email)



}