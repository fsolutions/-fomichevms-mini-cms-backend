import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PostModel, {
  PostDocument,
  PostInput,
} from "../models/post.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createPost(input: PostInput) {
  const metricsLabels = {
    operation: "createPost",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PostModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findPost",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PostModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAllPosts(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findAllPosts",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PostModel.find(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdatePost(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return PostModel.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<PostDocument>) {
  return PostModel.deleteOne(query);
}
