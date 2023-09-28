import { Request } from "express";
import { Optional } from "sequelize";

import Blog from "./Blog";
import User from "../users/User";

export interface RequestBlog extends Request {
  blog?: Blog
  authorizedUser?: User
}

export interface IBlogAttributes {
  id: number
  author?: string
  url: string
  title: string
  likes: number
  published: number
  userId: number
}

export interface IBlogCreationAttributes extends Optional<IBlogAttributes, 'id'> {}
