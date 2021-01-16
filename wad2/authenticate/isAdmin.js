import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from '../api/users/userModel.js'
dotenv.config();

// this checks to see if the user has admin privileges, I'm attempting here to have different levels of access to the API so regular users can view and admin can CRUD
//
export default function isAdmin(req, res, next) {
 // let authorization = req.Headers.Authorization.split(' ')[1], decoded;
        // const token = tokenA.slice(1, -1)
  try {
  console.log('@isAdmin, decoded: '+  decoded)
    // decoded = jwt.verify(authorization, process.env.SECRET_KEY)
    const usertoken = req.headers.authorization;
    console.log('@isAdmin, usertoken: '+ usertoken)
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    console.log(decoded);
  }catch (e)
  { res.status(500)}
  let user = User.findByEmail(decoded)
    if  (user.privilegeLevel === 1) {
        return next();
    }else
      return res.status(403).json({
    code:403, 
        msg:"Error: You do not have Admin privileges"
          
  })
  }
