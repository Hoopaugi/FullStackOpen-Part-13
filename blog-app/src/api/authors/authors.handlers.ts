import { Request, Response, NextFunction } from "express";

import authorsServices from "./authors.services";


const getAll = async (req: Request, res: Response) => {
  const authors = await authorsServices.getAll()

  res.json(authors);
}

export default { getAll }
