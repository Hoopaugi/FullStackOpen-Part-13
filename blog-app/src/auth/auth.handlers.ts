import { Request, Response, NextFunction } from "express";

import authServices from "./auth.services";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body

    const tokenPayload = await authServices.login(username, password)

    res.status(200).send(tokenPayload)
  } catch (error) {
    next(error)
  }
}

export default { login }
