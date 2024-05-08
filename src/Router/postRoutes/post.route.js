import express from "express";

import {
  addComment,
  createPost,
  delComment,
  deletePost,
  getPost,
  likePost,
  updatePost,
} from "../../controllers/postControllers.js";
import { asyncErrorHandler } from "../../Errors/asyncErrorHandler.js";
import { isUserAuthenticated } from "../../middleware/isUserAuthenticated.js";

const postRouter = express.Router();

postRouter.post("/", isUserAuthenticated, asyncErrorHandler(createPost)); //done
postRouter.get("/:id", isUserAuthenticated, asyncErrorHandler(getPost)); //done
postRouter.put("/:id", isUserAuthenticated, asyncErrorHandler(updatePost)); //done
postRouter.delete("/:id", isUserAuthenticated, asyncErrorHandler(deletePost)); //done

postRouter.post("/like/:id", isUserAuthenticated, asyncErrorHandler(likePost)); //done

postRouter.post(
  "/comment/:id",
  isUserAuthenticated,
  asyncErrorHandler(addComment)
); //done
// postRouter.put("/comment/:id",isUserAuthenticated,asyncErrorHandler(editComment));
postRouter.delete(
  "/comment/:postId/:commentId",
  isUserAuthenticated,
  asyncErrorHandler(delComment)
); //done

export default postRouter;
