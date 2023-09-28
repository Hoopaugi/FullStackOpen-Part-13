import { Request, Response, NextFunction } from "express";

import readinglistServices from "./readinglist.services";
import usersServices from "../users/users.services";
import blogsServices from "../blogs/blogs.services";
import { toNewReadinglist } from "./readinglist.utils";
import { RequestReadinglist } from "./readinglist.types";

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

const update = async (req: RequestReadinglist, res: Response, next: NextFunction) => {
  if (!req.readinglist) {
    return res.status(404).end()
  }

  if (!req.authorizedUser) {
    return res.status(400).send({ error: 'Not authorized' })
  }

  if (req.readinglist.userId !== req.authorizedUser.id) {
    return res.status(400).send({ error: 'Not owner' })
  }

  try {
    req.readinglist.read = ! req.readinglist.read

    await req.readinglist.save()

    res.json(req.readinglist)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll, update }
