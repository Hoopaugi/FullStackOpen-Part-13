import { Op, WhereOptions } from "sequelize"

import User from "../users/User"
import Blog from "./Blog"
import { IBlogCreationAttributes } from "./blogs.types"

const getAll = async (search: string | undefined = undefined, sort: boolean = false) => {
  let where: WhereOptions = {}

  if (search) {
    where = {
      [Op.or]: [
        { title: { [Op.substring]: search } },
        { author: { [Op.substring]: search } }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username', 'name']
    },
    where,
    order: sort ? [['likes', 'DESC']] : []
  })

  return blogs
}

const getById = async (id: string) => {
  const blog = await Blog.findByPk(id, { include: [User] })

  return blog
}

const create = async (object: IBlogCreationAttributes): Promise<Blog> => {
  const blog = await Blog.create(object, { include: [User] })

  return blog
}

export default { create, getAll, getById }
