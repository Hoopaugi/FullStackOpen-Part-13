import { Request, Response, NextFunction } from "express";

import authServices from "./auth.services";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body

    const tokenPayload = await authServices.login({username, password})

    res.status(200).send(tokenPayload)
  } catch (error) {
    next(error)
  }
}

const disable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id

    const disabled = await authServices.disable(userId)

    if (disabled) {
      res.status(200).send({message: 'Account has been disabled'})
    } else {
      res.status(200).send({message: 'Account has been enabled'})
    }
  } catch (error) {
    next(error)
  }
}

export default { login, disable }
