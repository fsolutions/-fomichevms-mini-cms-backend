import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface CategoryInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  header: string;
  alias: string;
  text: string;
  image: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {}

const categorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    header: { type: String, required: true },
    alias: { type: String, required: true },
    text: { type: String },
    image: { type: String },
  },
  {
    timestamps: false,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;
