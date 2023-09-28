import Readinglist from "./Readinglist"
import { IReadinglistCreationAttributes } from "./readinglist.types"

const getAll = async () => {
  const readinglists = await Readinglist.findAll({})

  return readinglists
}

const getById = async (id: string) => {
  const readinglist = await Readinglist.findByPk(id)

  return readinglist
}

const create = async (object: IReadinglistCreationAttributes): Promise<Readinglist> => {
  const readinglist = await Readinglist.create(object)

  return readinglist
}

export default { create, getAll, getById }
