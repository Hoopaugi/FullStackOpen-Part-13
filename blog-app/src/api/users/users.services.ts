import User from "./User"
import { IUserCreationAttributes } from "./users.types"

const getAll = async () => {
  const users = await User.findAll({})

  return users
}

const getById = async (id: string) => {
  const user = await User.findByPk(id)

  return user
}

const getByUsername = async (username: string, includeHash: Boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('full').findOne({ where: { username } })
  } else {
    user = await User.findOne({ where: { username } })
  }

  return user
}

const create = async (object: IUserCreationAttributes): Promise<User> => {
  const user = await User.create(object)

  return user
}

export default { create, getAll, getById, getByUsername }
