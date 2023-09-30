import ReadingListItem from "./ReadingListItem"
import { IReadingListItemCreationAttributes } from "./readingListItems.types"

const getAll = async () => {
  const readingListItems = await ReadingListItem.findAll({ attributes: { include: ['id'] } })

  return readingListItems
}

const getById = async (id: string) => {
  const readingListItem = await ReadingListItem.findByPk(id)

  return readingListItem
}

const create = async (object: IReadingListItemCreationAttributes): Promise<ReadingListItem> => {
  const readingListItem = await ReadingListItem.create(object)

  return readingListItem
}

export default { create, getAll, getById }
