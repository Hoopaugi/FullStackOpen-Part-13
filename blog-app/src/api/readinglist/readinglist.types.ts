import { Request } from "express";
import { Optional } from "sequelize";

import Readinglist from "./Readinglist";
import User from "../users/User";

export interface RequestReadinglist extends Request {
  readinglist?: Readinglist
  authorizedUser?: User
}

export interface IReadinglistAttributes {
  id: number
  blogId: number
  userId: number
  read: boolean
}

export interface IReadinglistCreationAttributes extends Optional<IReadinglistAttributes, 'id'> {}
