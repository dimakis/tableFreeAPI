import dotenv from "dotenv";
import express from "express";
import "./db.js";
import authRouter from "./api/users/index.js";
import User from "./api/users/userModel.js";
import tableRouter from './api/tables/index.js'
import passport from './authenticate/index.js'
import jwtDecode from 'jwt-decode'

const helmet = require("helmet");
//const { auth } = require ( 'express-openid-connect' )
const cors = require('cors')
const fs = require("file-system");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());
app.use(cors());
// app.use(auth());
app.use(passport.initialize())
app.use(helmet())

dotenv.config();

const port = process.env.PORT;

// error handler
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
    res.status(500).send(`Error caught:\n ${err.stack} `);
};

// code for use with headers
// app.use(/^(?!\/auth).*$/,  (req, res, next) => {
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 400
//     const message = 'Bad authorization header'
//     res.status(status).json({status, message})
//     return
//   }
//   try {
//      verifyToken(req.headers.authorization.split(' ')[1])
//      next()
//   } catch (err) {
//     const status = 400
//     const message = 'Error: access_token is not valid'
//     res.status(status).json({status, message})
//   }
// })

// routes to users 
app.use('/', authRouter)

// routes to tables protected routes, with passport and jwt
app.use('/', passport.authenticate('jwt', { session: false }), tableRouter);

// use error handler
app.use(errHandler)
// next line is how code should be once its all split up
app.use(express.static('public'));
// next line is for trusting the proxy for https
// app.set('trust proxy', true);
app.listen(port, () => {
    // Put a friendly message on the terminal
    console.info(`Server running at ${port}`);
});
