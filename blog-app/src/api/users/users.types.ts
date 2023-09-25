import { Request } from "express";
import { Optional } from "sequelize";

import User from "./User";

export interface RequestWithUser extends Request {
  user?: User
}

export interface IUserAttributes {
  id: number
  username: string
  name: string
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}
