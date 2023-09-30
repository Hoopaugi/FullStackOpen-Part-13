import User from "./User"
import Blog from "../blogs/Blog"
import { IUserCreationAttributes } from "./users.types"

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['id'] },
    include: [
      {
        model: Blog,
        as: 'blogs',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
      }
    ]
  })

  return users
}

const getById = async (id: string, includeHash: boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('sensitive').findByPk(id, { include: ['blogs'] })
  } else {
    user = await User.findByPk(id, { include: ['blogs'] })
  }

  return user
}

const getByUsername = async (username: string, includeHash: boolean = false) => {
  let user

  if (includeHash) {
    user = await User.scope('sensitive').findOne({ where: { username }, include: ['blogs'] })
  } else {
    user = await User.findOne({
      where: { username },
      attributes: {exclude: ['id']},
      include: [
        {
          model: Blog,
          as: 'blogs',
          attributes: {
            exclude: [
              'userId',
              'createdAt',
              'updatedAt'
            ]
          }
        },
        {
          model: Blog,
          as: 'readings',
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt']
          }
        }  
      ]
    })
  }

  return user
}

const create = async (object: IUserCreationAttributes): Promise<User> => {
  const user = await User.create(object, { include: ['blogs'] })

  return user
}

export default { create, getAll, getById, getByUsername }
