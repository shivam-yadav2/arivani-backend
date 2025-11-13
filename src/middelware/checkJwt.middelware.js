import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const checkJwt = async (req ,res , next)=>{
    console.log(req.headers)
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Unauthorized"});
    }
    const token =  authHeader.split(' ')

    
    const decodedToken = jwt.verify(token[1] , process.env.JWT_SECRET);
    const userCheck = await User.findById(decodedToken.id);
    if(!userCheck){
        return res.status(401).json({message:"Unauthorized User"})
    }
    console.log(decodedToken)
    req.user = decodedToken;
    next();
}

export default checkJwt;