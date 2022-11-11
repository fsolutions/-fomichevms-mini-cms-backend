import { Request, Response } from "express";
import {
  CreatePostInput,
  UpdatePostInput,
  DeletePostInput,
  ReadPostInput
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

  const post = await createPost({ ...body, user_id: userId });

  return res.send(post);
}

export async function updatePostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const postId = req.params.postId;
  const update = req.body;

  const post = await findPost({ _id: postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user_id) !== userId) {
    return res.sendStatus(403);
  }

  const updatedPost = await findAndUpdatePost({ _id: postId }, update, {
    new: true,
  });

  return res.send(updatedPost);
}

export async function getPostHandler(
  req: Request<ReadPostInput["params"]>,
  res: Response
) {
  const postId = req.params.postId;
  const post = await findPost({ _id: postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function getAllPostsHandler(
  req: Request<ReadPostInput["params"]>,
  res: Response
) {
  const query = req.query;
  console.log(query)

  const posts = await findAllPosts({ ...query });

  if (!posts) {
    return res.send([]);
  }

  return res.send(posts);
}

export async function deletePostHandler(
  req: Request<DeletePostInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const postId = req.params.postId;

  const post = await findPost({ _id: postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user_id) !== userId) {
    return res.sendStatus(403);
  }

  await deletePost({ _id: postId });

  return res.sendStatus(200);
}
