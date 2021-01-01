import express from "express";
import User from "./userModel";
import jwt from "jsonwebtoken";
// import movieModel from '../movies/movieModel.js'

// i used server in my first version, trying express.Router now
const router = express.Router();

// move this secret key and expires in to the .env file
const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database - for use later for more indepth app
async function userExists(email) {
  return User.userExistsByEmail(email) > 0 ? true : false;
}

// check password
async function isAuthenticated( email, password ) {
  const user = await User.findByEmail(email);
  user.comparePassword(password, (err, isMatch) => {
    return isMatch && !err ? true : false;
  });
}


// router.get('/', (req, res) => {
//     User.find().then(users =>  res.status(200).json(users));
// });
//   return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1

// login autherization from original attempt
router.post("/auth/login", async (req, res, next) => {
  // let obj = JSON.parse({req})
  // console.log('@server, post body.email: ' + {obj})
  const { email, password } = req;
  // const email = req.body.email
  // const password = req.body.password
  console.log("@server, post body.email: " + req.body );
  if (isAuthenticated({ email, password }) !== true) {
    const status = 401;
    const email1 = JSON.stringify({email})
    const password1 = JSON.stringify(password)
  console.log("@server, post email1: " + email1);
    const message = "Incorrect email " + email1 + " or password " + password1;
    res.status(status).json({ status, message });
    return;
  } else {
    const access_token = createToken({ email, password });
    // console.log('@server, token: ' + json({access_token}))
    res.status(200).json({ access_token });
  }
});

// using labs authenticate

// router.post('/auth/login', async (req, res, next) => {
//   if (!req.body.email || !req.body.password) {
//     res.status(401).json({
//       success: false,
//       msg: 'Please pass username and password.',
//     });
//   }
//   if (req.query.action === 'register') {
//     await User.create(req.body).catch(next);
//     res.status(201).json({
//       code: 201,
//       msg: 'Successful created new user.',
//     });
//   } else {
//     const user = await User.findEmail(req.body.email).catch(next);
//       if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
//       user.comparePassword(req.body.password, (err, isMatch) => {
//         if (isMatch && !err) {
//           // if user is found and password is right create a token
//           const token = jwt.sign(user.email, SECRET_KEY);
//           // return the information including token as JSON
//           res.status(200).json({
//             success: true,
//             token: 'BEARER ' + token,
//           });
//         } else {
//           res.status(401).json({
//             code: 401,
//             msg: 'Authentication failed. Wrong password.'
//           });
//         }
//       });
//     }
// });

// introducing registering of a new user, in labs this is combined with router.post('/') i have it seperate as it stands
//     if (req.query.action === 'register') {
//   await User.create(req.body).catch(next);
//   res.status(201).json({
//     code: 201,
//     msg: 'Successful created new user.',
//   });
// } else {
export default router;
