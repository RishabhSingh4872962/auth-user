import express from "express"

import { createPost } from "../../controllers/postControllers.js";


const postRouter=express.Router();


postRouter.post("/createPost",createPost)



export default postRouter