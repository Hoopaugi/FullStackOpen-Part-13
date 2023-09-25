import { Request, Response, NextFunction } from "express"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.message) {
    return res.status(400).send({error: error.message})
  }

  next(error)
}
