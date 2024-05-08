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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetToken:{
    type:String
  },
  resetTokenExpire:{
    type:Number
  }
});

userSchema.pre("save",async function (next) {
  if (this.isModified("password")) {
    this.password=await bcrypt.hash(this.password,10);
  }
  next();
})

export const User = mongoose.model('User', userSchema);
