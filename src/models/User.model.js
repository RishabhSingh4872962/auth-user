// models/User.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  resetToken:{
    type:String,
    select:false
  },
  resetTokenExpire:{
    type:Number,
    select:false
  }
});

userSchema.pre("save",async function (next) {
  if (this.isModified("password")) {
    this.password=await bcrypt.hash(this.password,10);
  }
  next();
})

export const User = mongoose.model('User', userSchema);
