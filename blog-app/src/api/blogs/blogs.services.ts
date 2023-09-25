import Blog from "./Blog"
import { IBlogCreationAttributes } from "./blogs.types"

const getAll = async () => {
  const blogs = await Blog.findAll({})

  return blogs
}

const getById = async (id: string) => {
  const blog = await Blog.findByPk(id)

  return blog
}

const create = async (object: IBlogCreationAttributes): Promise<Blog> => {
  const blog = await Blog.create(object)

  return blog
}

export default { create, getAll, getById }
