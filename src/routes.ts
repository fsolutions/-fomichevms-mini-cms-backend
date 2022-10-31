import { Express, Request, Response } from "express";
import {
  createCategoryHandler,
  getCategoryHandler,
  getAllCategoriesHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "./controller/category.controller";
import {
  createPostHandler,
  getPostHandler,
  getAllPostsHandler,
  updatePostHandler,
  deletePostHandler,
} from "./controller/post.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./schema/category.schema";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "./schema/post.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // CATEGORIES API
  app.get(
    "/api/categories",
    getAllCategoriesHandler
  );

  app.post(
    "/api/categories",
    [requireUser, validateResource(createCategorySchema)],
    createCategoryHandler
  );

  /**
   * @openapi
   * '/api/categories/{postId}':
   *  get:
   *     tags:
   *     - Categories
   *     summary: Get a single post by the postId
   *     parameters:
   *      - name: postId
   *        in: path
   *        description: The id of the post
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Category'
   *       404:
   *         description: Category not found
   */
  app.put(
    "/api/categories/:postId",
    [requireUser, validateResource(updateCategorySchema)],
    updateCategoryHandler
  );

  app.get(
    "/api/categories/:postId",
    validateResource(getCategorySchema),
    getCategoryHandler
  );

  app.delete(
    "/api/categories/:postId",
    [requireUser, validateResource(deleteCategorySchema)],
    deleteCategoryHandler
  );

  // POSTS API
  app.get(
    "/api/posts",
    getAllPostsHandler
  );

  app.post(
    "/api/posts",
    [requireUser, validateResource(createPostSchema)],
    createPostHandler
  );

  /**
   * @openapi
   * '/api/posts/{postId}':
   *  get:
   *     tags:
   *     - Posts
   *     summary: Get a single post by the postId
   *     parameters:
   *      - name: postId
   *        in: path
   *        description: The id of the post
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Post'
   *       404:
   *         description: Post not found
   */
  app.put(
    "/api/posts/:postId",
    [requireUser, validateResource(updatePostSchema)],
    updatePostHandler
  );

  app.get(
    "/api/posts/:postId",
    validateResource(getPostSchema),
    getPostHandler
  );

  app.delete(
    "/api/posts/:postId",
    [requireUser, validateResource(deletePostSchema)],
    deletePostHandler
  );
}

export default routes;
