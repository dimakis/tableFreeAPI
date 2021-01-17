import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../api/users/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;


const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await User.findByEmail(payload);
  console.log('@passport, user: ' + JSON.stringify(user))
  if (user.email) {
    next(null, user.email);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

export default passport;

