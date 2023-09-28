import User from "./User"
import Blog from "../blogs/Blog"
import { IUserCreationAttributes } from "./users.types"

const getAll = async () => {
  const users = await User.findAll({ include: [Blog] })

  return users
}

const getById = async (id: string, includeHash: boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('full').findByPk(id, { include: [Blog] })
  } else {
    user = await User.findByPk(id, { include: [Blog] })
  }

  return user
}

const getByUsername = async (username: string, includeHash: boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('full').findOne({ where: { username }, include: [Blog] })
  } else {
    user = await User.findOne({ where: { username }, include: [Blog] })
  }

  return user
}

const create = async (object: IUserCreationAttributes): Promise<User> => {
  const user = await User.create(object, { include: [Blog] })

  return user
}

export default { create, getAll, getById, getByUsername }
