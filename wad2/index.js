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
// app.use(passport)
dotenv.config();

const port = process.env.PORT;
// Configure our HTTP app to respond with Hello World to all requests.
// const app = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('Hello  World!');
// });

// ######### old server.js code

const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn} );
}

// Verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) =>
        decode !== undefined ? decode : err
    );
}

// check password
async function isAuthenticated(email, password) {
    const user = await User.findByEmail(email);
    console.log("user: ", user);
    console.log("user.password === password? : ", user.password === password);
    return user.password === password ? true : false;
}

// Check if the user exists in database
// function isAuthenticated({email, password}){
//   return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
// }

// fully functioning
// app.post("/auth/login", (req, res) => {
//     // let obj = JSON.parse({req})

//     // const { email, password } = req
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log("@app, post body.email: " + req.body.email);
//     // console.log("@app, isAuthenticated: " + isAuthenticated(email,password));

//     if (isAuthenticated(email, password) === false) {
//         const status = 401;
//         const message = "Incorrect email or password";
//         res.status(status).json({ status, message });
//         return;
//     } else {
//         const user = User.findByEmail(email);
//         const token = Buffer.from(email + 'utf8').toString('base64')
//         console.log("@app, token: " + token);
//         const access_token = jwt.sign({token}, SECRET_KEY, {expiresIn} )
//         // const access_token = createToken()   //email); //, password);
//         // console.log('@app, token: ' + json({access_token}))
//         res.status(200).json({ access_token });
//     }
// });



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

// app.use(router)

// ######### fin old code
// app.use('/', authRouter)
app.use('/', authRouter)


app.use('/', passport.authenticate('jwt', { session: false }), tableRouter);
// next line is how code should be once its all split up
app.use(express.static('public'));
// next line is for trusting the proxy for https
// app.set('trust proxy', true);
app.listen(port, () => {
    // Put a friendly message on the terminal
    console.info(`Server running at ${port}`);
});
