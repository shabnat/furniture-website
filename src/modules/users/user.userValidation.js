import validator from  'validator'

export  const signupValidation = (req)=>{

const { name,email,password,phone}=req.body

if(!name ||!email ||!password ||!phone){
  throw new Error('all fields are required')
}else if(!validator.isEmail(email)){
  throw new Error('email is not valid')
}else if(!validator.isStrongPassword(password)){
  throw new Error('enter strong password')
}

}

