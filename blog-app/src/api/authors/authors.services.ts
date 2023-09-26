import { fn, col } from "sequelize"

import Blog from "../blogs/Blog"

const getAll = async () => {
  const authors = await Blog.findAll({
    attributes: ['author', [fn('count', 'author'), 'articles'], [fn('sum', col('likes')), 'likes']],
    group: ['author']
  })

  return authors
}

export default { getAll }
