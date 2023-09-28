import { Request, Response, NextFunction } from "express";

import readinglistServices from "./readinglist.services";
import usersServices from "../users/users.services";
import blogsServices from "../blogs/blogs.services";
import { toNewReadinglist } from "./readinglist.utils";

const getAll = async (req: Request, res: Response) => {
  const readinglists = await readinglistServices.getAll()

  res.json(readinglists);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { blogId, userId } = req.body

    const user = await usersServices.getById(userId)
    const blog = await blogsServices.getById(blogId)
  
    if (!user || !blog) {
      throw new Error('Missing user or blog')
    }

    const newReadinglist = toNewReadinglist(blog, user)

    const readinglist = await readinglistServices.create(newReadinglist)

    return res.status(201).json(readinglist)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll }
