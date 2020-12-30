// Load the http module to create an http server.
import http from 'http';
import dotenv from 'dotenv'
import express from 'express';
import './db.js';
import authRouter from './api/users/'
const fs = require('file-system')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const server = express();

dotenv.config()

const port = process.env.PORT
// Configure our HTTP server to respond with Hello World to all requests.
// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('Hello  World!');
// });

// ######### old server.js code


const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }
  
  // Verify the token 
  function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
  }
  
  // Check if the user exists in database
  // function isAuthenticated({email, password}){
  //   return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
  // }
 

  // server.post('/auth/login', (req, res) => {
  //   // let obj = JSON.parse({req})
  //   // console.log('@server, post body.email: ' + {obj})

  //   const { email, password } = req
  //   console.log('@server, post body.email: ' + {email})
  //   if (isAuthenticated({email, password}) === -1) {
  //     const status = 401
  //     const message = 'Incorrect email or password'
  //     res.status(status).json({status, message})
  //     return
  //   }
  //   const access_token = createToken({email, password})
  //   // console.log('@server, token: ' + json({access_token}))
  //   res.status(200).json({access_token})
  // })
  
  // server.use(/^(?!\/auth).*$/,  (req, res, next) => {
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
  
  // server.use(router)



// ######### fin old code
server.use('/', authRouter)
server.use('auth/login', authRouter)
// next line is how code should be once its all split up
// server.use(express.static('public'));

server.listen(port);

// Put a friendly message on the terminal
console.log(`Server running at ${port}`);

