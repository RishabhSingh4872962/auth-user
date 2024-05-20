import { User } from "../models/User.model.js";

import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import crypto from "crypto";
import { transporter } from "../helper/emailSender.js";
import { generateToken } from "../helper/generateToken.js";

// Register route
export const userRegister = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (username == undefined || email == undefined || password == undefined) {
    return res
      .status(401)
      .send({ success: false, msg: "Enter the valid credensials" });
  }

  const existUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existUser) {
    return res.status(400).send({ success: false, msg: "User Already Exits" });
  }

  // Create new user
  const newUser = new User({
    username,
    email,
    password,
  });

  const token = generateToken({ id: newUser._id });

  if (!token) {
    return next(createHttpError(500, "Internal server Error"));
  }

  await newUser.save();

  return res
    .status(201)
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
    })
    .json({success:true, message: "User registered successfully" });
};

// Login route
export const userLogin = async (req, res, next) => {
  const { username, password ,email} = req.body;

  // Check if user exists
  const user = await User.findOne({
    $or:[{username},{email}]
  }).select("+password");
  if (!user) {
    return next(createHttpError(400, "Invalid username or password"));
  }

  // Compare password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(createHttpError(400, "Invalid username or password"));
  }

  // Generate JWT token
  const token = generateToken({ id: user._id });

  if (!token) {
    return next(createHttpError(500, "Internal server Error"));
  }

  return res
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
    }).status(200)
    .send({ success: true, message: "User login Successfully" });
};

// Forgot Password route
export const userForget = async (req, res, next) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");

  const updateResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  user.resetToken = updateResetToken;

  user.resetTokenExpire = Date.now() + 900000;

  // Send password reset email
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Password Reset",
    html: `<p>Please copy the reset token  ${token}</p>`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return next(createHttpError(500, "Error sending email"));
    }

    await user.save();
    return res.send(200).json({ success:true,message: "Password reset email sent", token });
  });
};

// Reset Password route
export const userResetPassword = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;

  const { token } = req.params;

  if (
    newPassword == undefined ||
    confirmPassword == undefined ||
    newPassword !== confirmPassword
  ) {
    return res
      .status(401)
      .send({ success: false, msg: "Enter the valid credensials" });
  }

  const updateResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetToken: updateResetToken,
    resetTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return res
      .status(400)
      .send({ success: false, msg: "token expired ,generate new token" });
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  return res.status(201).send({ success:true, message: "Password reset successfully" });
};


export const logout=async(req,res,next)=>{
  return res.status(200).clearCookie("token").send({success:true,message:"User Logout Successfully"})
}