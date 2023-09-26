import { Request, Response, NextFunction } from "express"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.message === 'Invalid or missing token') {
    return res.status(401).send({error: error.message})
  }

  if (error.message) {
    return res.status(400).send({error: error.message})
  }
  console.log(error)
  next(error)
}
