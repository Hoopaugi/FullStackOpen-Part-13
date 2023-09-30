import { Response, NextFunction } from "express";

import readingListsServices from "./readingListItems.services";
import { RequestWithReadingListItem } from "./readingListItems.types";
import { parseId } from "../../utils";

export const readingListItemFinder = async (req: RequestWithReadingListItem, res: Response, next: NextFunction) => {
  try {
    const id = parseId(req.params.id)

    const readingListItem = await readingListsServices.getById(id)
  
    if (readingListItem) {
      req.readingListItem = readingListItem
    }
  
    next()
  } catch (error) {
    next(error)
  }
}
