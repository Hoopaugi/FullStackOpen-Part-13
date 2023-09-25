import { Request, Response, NextFunction } from "express";

import blogsServices from "./blogs.services";
import { RequestWithBlog } from "./blogs.types";

const getAll = async (req: Request, res: Response) => {
  const blogs = await blogsServices.getAll()

  res.json(blogs);
}

const getById = async (req: RequestWithBlog, res: Response) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end()
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body

    const blog = await blogsServices.create(body)

    return res.json(blog)
  } catch (error) {
    next(error)
  }
}

const destroy = async (req: RequestWithBlog, res: Response) => {
  if (req.blog) {
    await req.blog.destroy() 
  }

  res.status(204).end()
}

const update = async (req: RequestWithBlog, res: Response) => {
  if (req.blog) {
    req.blog.likes = Number(req.body.likes)

    await req.blog.save()

    res.json(req.blog)
  } else {
    res.status(404).end()
  }
}

export default { create, destroy, getAll, getById, update }
