// models/User.js

import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
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
      likeCount: Number,
      default: 0,
      required: true,
      likeBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: {
      comment: String,
      commentBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", postSchema);


