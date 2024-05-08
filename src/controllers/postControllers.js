import createHttpError from "http-errors";
import { Post } from "../models/Post.model.js";
import { User } from "../models/User.model.js";
import mongoose from "mongoose";

export const createPost = async (req, res, next) => {
  const { postName, postImageUrl, postDescription } = req.body;

  if (!postName || !postImageUrl || !postDescription) {
    return next(createHttpError(400, "Enter the valid Credensials"));
  }
  const userId = req.userId;

  const createPost = await Post({
    postName,
    postImageUrl,
    postDescription,
    postAuthor: userId,
  });

  await createPost.save();

  return res.status(201).send({
    success: true,
    msg: "Post created Successfully",
  });
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Enter the valid Id"));
  }

  const userId = req.userId;

  const post = await Post.findOne({
    $and: [{ _id: id }, { postAuthor: userId }],
  });
  if (!post) {
    return next(createHttpError(404, "Post not Found"));
  }
  return res.status(200).send({
    success: true,
    post,
  });
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Enter the valid Id"));
  }

  const userId = req.userId;

  const {
    postName = undefined,
    postImageUrl = undefined,
    postDescription = undefined,
  } = req.body;

  const post = await Post.findOneAndUpdate(
    { $and: [{ _id: id }, { postAuthor: userId }] },
    { postName, postImageUrl, postDescription }
  );
  if (!post) {
    return next(createHttpError(404, "Post not Found"));
  }

  await post.save();

  return res.status(200).send({
    success: true,
    message: "Post update Successfully",
    newPost: post,
  });
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Enter the valid Id"));
  }

  const post = await Post.findOneAndDelete({
    $and: [{ _id: id }, { postAuthor: userId }],
  });
  if (!post) {
    return next(createHttpError(404, "Post not Found"));
  }

  return res.status(200).send({
    success: true,
    message: "Post Deleted Successfully",
  });
};

export const likePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Enter the valid Id"));
  }

  const post = await Post.findOne({
    _id: id,
  }).select("+likes");
  if (!post) {
    return next(createHttpError(404, "Post not Found"));
  }

  const alreadyLiked = post.likes.likeBy.find((id) => id == userId);

  if (!alreadyLiked) {
    post.likes.likeCount = post.likes.likeCount + 1;
    post.likes.likeBy.push(userId);
  } else {
    post.likes.likeCount = post.likes.likeCount - 1;
    post.likes.likeBy = post.likes.likeBy.filter((id) => id != userId);
  }

  await post.save();

  return res.status(201).send({
    success: true,
    msg: `Post ${alreadyLiked ? "Dislike" : "Liked"} Successfully`,
  });
};

export const addComment = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;
  const { comment } = req.body;
  const post = await Post.findOne({
    _id: id,
  });
  if (!post) {
    return next(createHttpError(404, "Post not Found"));
  }

  post.comments.push({
    comment,
    commentBy: userId,
  });

  await post.save();

  return res
    .status(201)
    .send({ success: true, msg: "User add a comment to post" });
};

// export const editComment = async (req, res, next) => {
//   const { id } = req.params;
//   const userId = req.userId;
//   const { comment } = req.body;

//   const post = await Post.findOne({
//     _id:id,
//   }).select("+comments");
//   if (!post) {
//     return next(createHttpError(404, "Post not Found"));
//   }

//   console.log(post.comments);

//   return res
//     .status(201)
//     .send({ success: true, msg: "User update a comment to post" });
// };

export const delComment = async (req, res, next) => {
  const { postId,commentId } = req.params;
  const userId = req.userId;

  const post = await Post.findOne({
    _id:postId,
  });
  if (!post) {
    return next(createHttpError(404, "Post not Found"));
  }
 const postIndex=post.comments.findIndex(({_id})=>_id==commentId);

 if (postIndex<0) {
  return next(createHttpError(404,"Comment not found"))
 }
 post.comments.splice(postIndex,1);


 await post.save();
  return res
    .status(201)
    .send({ success: true, msg: "User deleted the comment" });
};
