// models/User.js

import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    postAuthor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
      select:false
    },
    postName: {
      type: String,
      required: true,
    },
    postImageUrl: {
      type: String,
    },
    postDescription: {
      type: String,
    },
    likes: {
      likeCount: {
        type: Number,
        default: 0,
        required: true,
      },
      likeBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
    },
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        commentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
