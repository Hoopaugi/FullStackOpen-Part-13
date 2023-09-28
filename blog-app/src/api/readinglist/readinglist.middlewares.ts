import { Response, NextFunction } from "express";

import readinglistServices from "./readinglist.services";
import { RequestReadinglist } from "./readinglist.types";
import { parseId } from "../../utils";

export const readinglistFinder = async (req: RequestReadinglist, res: Response, next: NextFunction) => {
  try {
    const id = parseId(req.params.id)

    const readinglist = await readinglistServices.getById(id)
  
    if (readinglist) {
      req.readinglist = readinglist
    }
  
    next()
  } catch (error) {
    next(error)
  }
}
