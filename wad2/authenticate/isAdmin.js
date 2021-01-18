import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from '../api/users/userModel.js'
dotenv.config();

export default async function isAdmin ( req, res, next ) {
  // const email = req.body.email
 let authorization = req.headers.authorization.split(' ')[1], token;
  console.log('@isAdmin, authorization:' + authorization + '@isAdmin, token ' + token)
  let decoded = jwt.decode( authorization  )
  console.log('@admin, decoded: ' + decoded)
  const user = await User.findByEmail(decoded)
  console.log('@admin, user:' + user.privilegeLevel)
  if( user.privilegeLevel === 1 ) {
     return true;
  }
  return false;
}

