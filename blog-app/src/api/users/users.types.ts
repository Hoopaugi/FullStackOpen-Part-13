import { Request } from "express";
import { Optional } from "sequelize";

import Blog from "../blogs/Blog";
import User from "./User";

export interface RequestWithUser extends Request {
  user?: User
}

export interface IUserAttributes {
  id: number
  username: string
  name: string
  passwordHash: string
  blogs: Blog[]
  disabled: boolean
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'disabled'> {}
