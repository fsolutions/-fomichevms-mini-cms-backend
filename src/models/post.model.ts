import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";

export interface PostInput {
  user_id: UserDocument["_id"];
  category_id: CategoryDocument["_id"];
  title: string;
  description: string;
  header: string;
  alias: string;
  text: string;
  image: string;
  external_url: string;
}

export interface PostDocument extends PostInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    category_id: { type: String, required: true },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    header: { type: String, required: true },
    alias: { type: String, required: true },
    text: { type: String },
    image: { type: String },
    external_url: { type: String }
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;
