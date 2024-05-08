import jwt from "jsonwebtoken";

import _config from "../config/config.js"

export const generateToken= (userCrednesials)=>{
    return  jwt.sign(userCrednesials,_config.JWT_SECRET_KEY)
}