import jwt from 'jsonwebtoken';
const generateToken = (users) => {
    console.log(process.env.SECRET_KEY)
    return jwt.sign({ id: users.id, role: users.role }, process.env.SECRET_KEY, {})
}

export {
    generateToken
}