import { Request, Response, NextFunction } from "express";

import readingListsServices from "./readingListItems.services";
import usersServices from "../users/users.services";
import blogsServices from "../blogs/blogs.services";
import { toNewReadingListItem } from "./readingListItems.utils";
import { RequestWithReadingListItem } from "./readingListItems.types";

const getAll = async (req: Request, res: Response) => {
  const readingListItems = await readingListsServices.getAll()

  res.json(readingListItems);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { blogId, userId } = req.body

    const user = await usersServices.getById(userId)
    const blog = await blogsServices.getById(blogId)
  
    if (!user || !blog) {
      throw new Error('Missing user or blog')
    }

    const newReadingListItem = toNewReadingListItem(blog, user)

    const readingListItem = await readingListsServices.create(newReadingListItem)

    return res.status(201).json(readingListItem)
  } catch (error) {
    next(error)
  }
}

const update = async (req: RequestWithReadingListItem, res: Response, next: NextFunction) => {
  if (!req.readingListItem) {
    return res.status(404).end()
  }

  if (!req.authorizedUser) {
    return res.status(400).send({ error: 'Not authorized' })
  }

  if (req.readingListItem.userId !== req.authorizedUser.id) {
    return res.status(400).send({ error: 'Not owner' })
  }

  try {
    req.readingListItem.read = ! req.readingListItem.read

    await req.readingListItem.save()

    res.json(req.readingListItem)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll, update }
