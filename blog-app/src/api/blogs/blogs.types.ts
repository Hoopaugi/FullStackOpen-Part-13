import { Request } from "express";
import { Optional } from "sequelize";

import Blog from "./Blog";

export interface RequestWithBlog extends Request {
  blog?: Blog
}

export interface IBlogAttributes {
  id: number
  author: string
  url: string
  title: string
  likes: number
}

export interface IBlogCreationAttributes extends Optional<IBlogAttributes, 'id'> {}
