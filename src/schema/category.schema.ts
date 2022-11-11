import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Category:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - header
 *        - alias
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         header:
 *           type: string
 *         alias:
 *           type: string
 *         text:
 *           type: string
 *         image:
 *           type: string
 */

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    header: string({
      required_error: "Header is required",
    }),
    alias: string({
      required_error: "Alias is required",
    }),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const getCategorySchema = object({
  ...params,
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
