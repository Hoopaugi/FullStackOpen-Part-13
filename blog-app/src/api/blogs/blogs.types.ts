import { Request } from "express";

import Blog from "./Blog";

export interface RequestWithBlog extends Request {
  blog?: Blog | null
}
