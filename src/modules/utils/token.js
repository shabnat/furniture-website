import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


export const generateUserToken = (id,role)=>{
  try {
    const token = jwt.sign({id:id,role: role|| 'user'},process.env.JWT_SECRET, {expiresIn:"7d"})
    return token
  } catch (error) {
    console.log(error)
  }
}