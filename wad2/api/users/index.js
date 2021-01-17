import express from "express";
import User from "./userModel";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

// i used server in my first version, trying express.Router now
const router = express.Router();


// Check if the user exists in database - for use later for more indepth app
async function userExists(email) {
  return User.userExistsByEmail(email) > 0 ? true : false;
}

async function isAuthenticated(email, password) {
    const user = await User.findByEmail(email);
    console.log("user: ", user);
    console.log("user.password === password? : ", user.password === password);
    return user.password === password ? true : false;
 }

// check password
// async function isAuthenticated( email, password ) {
//   const user = await User.findByEmail(email);
//   user.comparePassword(password, (err, isMatch) => {
//     return isMatch && !err ? true : false;
//   });

// Register OR authenticate a user
router.post('/auth/login', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log('@not user or password, req: ' + req.body)
    res.status(401).json({
      success: false,
      msg: 'Please pass username and password.',
    });
  }
  if (req.query.action === 'register') {
    console.log('@in register before User.create')
    try{
    await User.create(req.body).catch(next);
    console.log('@in register')
    res.status(201).json({
      code: 201,
      msg: 'Successful created new user.',
    });
    } catch (error) {
      return res.status(401).json({
      code:401,
      message:'Error creating user' + error

    })
  }} else {
    const user = await User.findByEmail(req.body.email).catch(next);
    console.log('@authenticate, user: ' + JSON.stringify(user))
    if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        const token = jwt.sign(user.email, process.env.SECRET_KEY);
        // return the information including token as JSON
        res.status(200).json({
          success: true,
          token: 'Bearer ' + token,
        });
      } else {
        res.status(401).json({
          code: 401,
          msg: 'Authentication failed. Wrong password.'
        });
      }
    });
  }
});


// Update a user, functional 
router.put('/user/:id',  (req, res, next) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    }).catch(next)
    .then(user => res.json(200, user));
});

export default router;
