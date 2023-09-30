import { Op, FindOptions } from "sequelize"

import Blog from "./Blog"
import { IBlogAttributes, IBlogCreationAttributes } from "./blogs.types"

const getAll = async (search: string | undefined = undefined, sort: boolean = false) => {
  const options: FindOptions<IBlogAttributes> = {
    attributes: { exclude: ['userId', 'user.id'] },
    where: search ? {
      [Op.or]: [
        { title: { [Op.substring]: search } },
        { author: { [Op.substring]: search } }
      ]
    } : {},
    order: sort ? [
      ['likes', 'DESC']
    ] : []
  }

  const blogs = await Blog.findAll(options)

  return blogs
}

const getById = async (id: string) => {
  const blog = await Blog.findByPk(id, { include: ['user'] })

  return blog
}

const create = async (object: IBlogCreationAttributes): Promise<Blog> => {
  const blog = await Blog.create(object, { include: ['user'] })

  return blog
}

export default { create, getAll, getById }
