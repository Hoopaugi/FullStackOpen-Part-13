import { Request, Response } from "express";

import Blog from "./Blog";
import { RequestWithBlog } from "./blogs.types";

const getAll = async (req: Request, res: Response) => {
  const blogs = await Blog.findAll({})

  res.json(blogs);
}

const getById = async (req: RequestWithBlog, res: Response) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end()
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body)

    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const destroy = async (req: RequestWithBlog, res: Response) => {
  if (req.blog) {
    await req.blog.destroy() 
  }

  res.status(204).end()
}

export default { create, destroy, getAll, getById }
