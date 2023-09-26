import { Request } from "express"

import User from "../api/users/User"

export interface IAuthPayload {
  username: string
  name: string
  token: string
}

export interface ICredentials {
  username: string
  password: string
}

export interface RequestWithAuthorizedUser extends Request {
  authorizedUser?: User
}

export interface JwtPayload {
  id: string
}
