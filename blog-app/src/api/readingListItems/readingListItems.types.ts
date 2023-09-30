import { Request } from "express";
import { Optional } from "sequelize";

import ReadingListItem from "./ReadingListItem";
import User from "../users/User";

export interface RequestWithReadingListItem extends Request {
  readingListItem?: ReadingListItem
  authorizedUser?: User
}

export interface IReadingListItemAttributes {
  id: number
  blogId: number
  userId: number
  read: boolean
}

export interface IReadingListItemCreationAttributes extends Optional<IReadingListItemAttributes, 'id'> {}
