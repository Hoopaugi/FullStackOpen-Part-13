import { Response, NextFunction } from "express";

import usersServices from "./users.services";
import { RequestWithUser } from "./users.types";
import { parseUsername } from "./users.utils";

export const userFinder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const username = parseUsername(req.params.username)

    const user = await usersServices.getByUsername(username)
  
    if (user) {
      req.user = user
    }
  
    next()
  } catch (error) {
    next(error)
  }
}
