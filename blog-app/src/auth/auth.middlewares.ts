import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

import usersServices from "../api/users/users.services"
import { extractToken } from "./auth.utils"
import { RequestWithAuthorizedUser, JwtPayload } from "./auth.types"
import { SECRET } from "../config"

export const authenticatedUserExtractor = async (req: RequestWithAuthorizedUser, res: Response, next: NextFunction) => {
  const extractedToken = extractToken(req)

  if (!extractedToken) {
    const error = new Error('Invalid or missing token')

    return next(error)
  }

  const decodedToken = jwt.verify(extractedToken, SECRET) as JwtPayload

  if (!decodedToken.id) {
    const error = new Error('Invalid or missing token')

    return next(error)
  }

  const user = await usersServices.getById(decodedToken.id)

  if(!user) {
    return next()
  }

  req.authorizedUser = user

  next()
}
