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

async function isAuthenticated(email, password) {
    const user = await User.findByEmail(email);
    console.log("user: ", user);
    console.log("user.password === password? : ", user.password === password);
    return user.password === password ? true : false;
// }
// // check password
// async function isAuthenticated( email, password ) {
//   const user = await User.findByEmail(email);
//   user.comparePassword(password, (err, isMatch) => {
//     return isMatch && !err ? true : false;
//   });
}


// router.get('/', (req, res) => {
//     User.find().then(users =>  res.status(200).json(users));
// });
//   return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1

router.post("/auth/login", async (req, res, next) => {

if (req.query.action === 'register') {
  console.log("@server, action === register, req.body: " + JSON.stringify(req.body));
  await User.create(req.body).catch(next);
  console.log("@server, after User.create: ");
  res.status(201).json({
    code: 201,
    msg: 'Successful created new user.',
  });
} else {
    // let obj = JSON.parse({req})
    // const { email, password } = req
    const email = req.body.email;
    const password = req.body.password;
    console.log("@server, post body.email: " + req.body.email);
    // console.log("@server, isAuthenticated: " + isAuthenticated(email,password));

    if (isAuthenticated(email, password) === false) {
        const status = 401;
        const message = "Incorrect email or password";
        res.status(status).json({ status, message });
        return;
    } else {
        const user = User.findByEmail(email);
        const token = Buffer.from(email + 'utf8').toString('base64')
        console.log("@server, token: " + token);
        const access_token = jwt.sign({token}, SECRET_KEY, {expiresIn} )
        // const access_token = createToken()   //email); //, password);
        // console.log('@server, token: ' + json({access_token}))
        res.status(200).json({ access_token });
    }
}});
// login autherization from original attempt

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
// router.post('auth/register', asyn ( req, res, next )  {
// if (req.query.action === 'register') {
//   await User.create(req.body).catch(next);
//   res.status(201).json({
//     code: 201,
//     msg: 'Successful created new user.',
//   });
// } else {

// )


export default router;
