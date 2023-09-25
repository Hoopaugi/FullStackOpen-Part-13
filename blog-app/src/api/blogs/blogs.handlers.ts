import { Request, Response } from "express";

import Blog from "./blogs";

const getAll = async (req: Request, res: Response) => {
  const blogs = await Blog.findAll({})

  res.json(blogs);
}

const getById = async (req: Request, res: Response) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    res.json(blog);
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

const destroy = async (req: Request, res: Response) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    await blog.destroy()

    res.status(204).end()
  } else {
    res.status(404).end()
  }
}

export default { create, destroy, getAll, getById }
