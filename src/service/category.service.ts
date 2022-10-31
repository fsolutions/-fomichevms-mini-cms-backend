import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, {
  CategoryDocument,
  CategoryInput,
} from "../models/category.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createCategory(input: CategoryInput) {
  const metricsLabels = {
    operation: "createCategory",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CategoryModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findCategory",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CategoryModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAllCategories(
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findAllCategories",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CategoryModel.find({});
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateCategory(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return CategoryModel.findOneAndUpdate(query, update, options);
}

export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}
