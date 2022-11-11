import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Post:
 *       type: object
 *       required:
 *        - category_id
 *        - title
 *        - description
 *        - header
 *        - alias
 *       properties:
 *         category_id:
 *           type: string
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
 *         external_url:
 *           type: string
 */

const payload = {
  body: object({
    category_id: string({
      required_error: "Category is required",
    }),
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
    postId: string({
      required_error: "postId is required",
    }),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...payload,
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export const getPostSchema = object({
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type ReadPostInput = TypeOf<typeof getPostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;
