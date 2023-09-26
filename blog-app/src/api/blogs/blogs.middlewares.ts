import { Response, NextFunction } from "express";

import blogsServices from "./blogs.services";
import { RequestBlog } from "./blogs.types";
import { parseId } from "../../utils";

export const blogFinder = async (req: RequestBlog, res: Response, next: NextFunction) => {
  try {
    const id = parseId(req.params.id)

    const blog = await blogsServices.getById(id)
  
    if (blog) {
      req.blog = blog
    }
  
    next()
  } catch (error) {
    next(error)
  }
}
