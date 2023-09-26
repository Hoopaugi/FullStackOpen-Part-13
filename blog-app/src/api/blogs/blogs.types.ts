import { Request } from "express";
import { Optional } from "sequelize";

import Blog from "./Blog";
import User from "../users/User";

export interface RequestWithBlog extends Request {
  blog?: Blog
}

export interface IBlogAttributes {
  id: number
  author?: string
  url: string
  title: string
  likes: number
  userId: number
}

export interface IBlogCreationAttributes extends Optional<IBlogAttributes, 'id'> {}
