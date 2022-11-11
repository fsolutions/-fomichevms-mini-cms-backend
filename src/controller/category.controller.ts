import { Request, Response } from "express";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  ReadCategoryInput,
  DeleteCategoryInput
} from "../schema/category.schema";
import {
  createCategory,
  deleteCategory,
  findAndUpdateCategory,
  findCategory,
  findAllCategories
} from "../service/category.service";

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const category = await createCategory({ ...body, user: userId });

  return res.send(category);
}

export async function updateCategoryHandler(
  req: Request<UpdateCategoryInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const categoryId = req.params.categoryId;
  const update = req.body;

  const category = await findCategory({ _id: categoryId });

  if (!category) {
    return res.sendStatus(404);
  }

  if (String(category.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedCategory = await findAndUpdateCategory({ _id: categoryId }, update, {
    new: true,
  });

  return res.send(updatedCategory);
}

export async function getCategoryHandler(
  req: Request<ReadCategoryInput["params"]>,
  res: Response
) {
  const categoryId = req.params.categoryId;
  const category = await findCategory({ _id: categoryId });

  if (!category) {
    return res.sendStatus(404);
  }

  return res.send(category);
}

export async function getAllCategoriesHandler(
  req: Request,
  res: Response
) {
  const categories = await findAllCategories();

  if (!categories) {
    return res.sendStatus(404);
  }

  return res.send(categories);
}

export async function deleteCategoryHandler(
  req: Request<DeleteCategoryInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const categoryId = req.params.categoryId;

  const category = await findCategory({ _id: categoryId });

  if (!category) {
    return res.sendStatus(404);
  }

  if (String(category.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteCategory({ _id: categoryId });

  return res.sendStatus(200);
}
