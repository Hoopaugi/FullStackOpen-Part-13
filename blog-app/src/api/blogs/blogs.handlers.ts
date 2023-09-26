import { Request, Response, NextFunction } from "express";

import blogsServices from "./blogs.services";
import { RequestWithBlog } from "./blogs.types";
import { toNewBlog, parseLikes } from "./blogs.utils";

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
    const newBlog = toNewBlog(req.body)

    const blog = await blogsServices.create(newBlog)

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

const update = async (req: RequestWithBlog, res: Response, next: NextFunction) => {
  if (req.blog) {
    try {
      req.blog.likes = parseLikes(req.body.likes)

      await req.blog.save()
  
      res.json(req.blog)
    } catch (error) {
      next(error)
    }
  } else {
    res.status(404).end()
  }
}

export default { create, destroy, getAll, getById, update }