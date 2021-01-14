import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  id: { type: String, required: false },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  username: { type: String, required: false },
  status: { type: String, required: false },
  isAdmin: { type: String, required: false },
  //  favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
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


// UserSchema.methods.comparePassword = function(passw, cb) {
//     bcrypt.compare(passw, this.password, (err, isMatch) => {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

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
