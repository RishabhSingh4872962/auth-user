import createHttpError from "http-errors";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import _config from "../config/config.js";

export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(createHttpError(400, "Make a login or session expired"));
    }

    const userPayload = await verifyToken(token);
    
    if (!userPayload) {
      return next(createHttpError(400, "Make a login"));
    }

    const user = await User.findOne({ _id: userPayload.id });
    if (!user) {
      res.clearCookie("token");
      return next(createHttpError(400, "Make a login"));
    }

    req.userId = user.id;

    next();
  } catch (error) {
    return next(error);
  }
};

async function verifyToken(token) {
  return await jwt.verify(token, _config.JWT_SECRET_KEY,{complete:true}).payload;
}
