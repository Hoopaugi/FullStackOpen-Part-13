import { Request, Response, NextFunction } from "express";

import blogsServices from "./blogs.services";
import { RequestBlog } from "./blogs.types";
import { toNewBlog, parseLikes } from "./blogs.utils";
import { RequestWithAuthorizedUser } from "../../auth/auth.types";

const getAll = async (req: Request, res: Response) => {
  const search = req.query.search ? String(req.query.search) : undefined
  const sort = req.query.sort ? Boolean(req.query.sort) : false

  const blogs = await blogsServices.getAll(search, sort)

  res.json(blogs);
}

const getById = async (req: RequestBlog, res: Response) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end()
  }
}

const create = async (req: RequestWithAuthorizedUser, res: Response, next: NextFunction) => {
  try {
    // TODO: Refactor following two lines into own function. Same for User
    const newBlog = toNewBlog({ ...req.body, authorizedUser: req.authorizedUser})

    const blog = await blogsServices.create(newBlog)

    return res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
}

const destroy = async (req: RequestBlog, res: Response) => {
  if (!(req.authorizedUser && req.blog && req.authorizedUser.id === req.blog.user_id)) {
    return res.status(401).send({error: 'Not authorized'})
  }

  await req.blog.destroy() 

  res.status(204).end()
}

const update = async (req: RequestBlog, res: Response, next: NextFunction) => {
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
