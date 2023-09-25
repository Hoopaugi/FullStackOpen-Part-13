import { Response, NextFunction } from "express";

import Blog from "./Blog";
import { RequestWithBlog } from "./blogs.types";

export const blogFinder = async (req: RequestWithBlog, res: Response, next: NextFunction) => {
  const id = Number(req.params.id)

  req.blog = await Blog.findByPk(id)

  next()
}
