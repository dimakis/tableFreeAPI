import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const UserSchema = new Schema({
  // email: { type: String, unique: true, required: true },
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
  password: { type: String, required: [true, 'Invalid password option'],min: 3 },
  id: { type: String, required: false },
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  status: { type: String },
  privilegeLevel: { 
    type: String, 
    required: [true, 'Please input valid privilege level, 0 is default'], 
    min:[0, 'Please enter correct privilege level: 0 (default) or higher'],  
    max:[3,  'Please enter correct privilege level: 0 (default) - 3=max privilege level' ]},
});

// check user exists in db
UserSchema.statics.userExistsByEmail = function (email) {
  return this.find({ email: email }).count();
};

//find user in db
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

// comparePassword with bcrypt - comapre sync
// UserSchema.methods.comparePassword = function (passw, cb) {
//   bcrypt.compareSync(passw, this.password, (err, isMatch) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };
UserSchema.methods.comparePassword = function(plaintext, cb) {
  bcrypt.compare(plaintext, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  }
  )
}

UserSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    // bcrypt.genSalt(10, (err, salt) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   bcrypt.hash(user.password, salt, null, (err, hash) => {
    //     if (err) {
    //       return next(err);
    //     }    
      bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        return next(err);
      }
        user.password = hash;
        next();
      }
      )}

         // user.password = bcrypt.hashSync(user.password, 10);
   else {
    return next();
  }
});

export default mongoose.model("User", UserSchema);
