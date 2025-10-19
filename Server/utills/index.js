import jwt from 'jsonwebtoken';
const generateToken =(institutes_users) =>{
    console.log(process.env.SECRET_KEY)
    return jwt.sign({ id:institutes_users.id}, process.env.SECRET_KEY,{})
}

export{
    generateToken
}