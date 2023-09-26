import User from "../users/User"
import Blog from "./Blog"
import { IBlogCreationAttributes } from "./blogs.types"

const getAll = async () => {
  const blogs = await Blog.findAll({ include: [User] })

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
