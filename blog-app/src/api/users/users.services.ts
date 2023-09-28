import User from "./User"
import { IUserCreationAttributes } from "./users.types"

const getAll = async () => {
  const users = await User.findAll({ include: ['blogs'] })

  return users
}

const getById = async (id: string, includeHash: boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('full').findByPk(id, { include: ['blogs'] })
  } else {
    user = await User.findByPk(id, { include: ['blogs'] })
  }

  return user
}

const getByUsername = async (username: string, includeHash: boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('full').findOne({ where: { username }, include: ['blogs'] })
  } else {
    user = await User.findOne({ where: { username }, include: ['blogs'] })
  }

  return user
}

const create = async (object: IUserCreationAttributes): Promise<User> => {
  const user = await User.create(object, { include: ['blogs'] })

  return user
}

export default { create, getAll, getById, getByUsername }
