import { Request, Response, NextFunction } from "express";

import usersServices from "./users.services";
import { RequestWithUser } from "./users.types";
import { toNewUser, parseUsername } from "./users.utils";

const getAll = async (req: Request, res: Response) => {
  const users = await usersServices.getAll()

  res.json(users);
}

const getByUsername = async (req: RequestWithUser, res: Response) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).end()
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await toNewUser(req.body)

    const user = await usersServices.create(newUser)

    return res.json(user)
  } catch (error) {
    next(error)
  }
}

const update = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user) {
    try {
      req.user.username = parseUsername(req.body.username)

      await req.user.save()
  
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  } else {
    res.status(404).end()
  }
}

export default { create, getAll, getByUsername, update }
