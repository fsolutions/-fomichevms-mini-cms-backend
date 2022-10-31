import { Request, Response } from "express";
import {
  CreatePostInput,
  UpdatePostInput,
} from "../schema/post.schema";
import {
  createPost,
  deletePost,
  findAndUpdatePost,
  findPost,
  findAllPosts
} from "../service/post.service";

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const post = await createPost({ ...body, user: userId });

  return res.send(post);
}

export async function updatePostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const postId = req.params.postId;
  const update = req.body;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedPost = await findAndUpdatePost({ postId }, update, {
    new: true,
  });

  return res.send(updatedPost);
}

export async function getPostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const postId = req.params.postId;
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function getAllPostsHandler(
  req: Request,
  res: Response
) {
  const posts = await findAllPosts();

  if (!posts) {
    return res.sendStatus(404);
  }

  return res.send(posts);
}

export async function deletePostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const postId = req.params.postId;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}
