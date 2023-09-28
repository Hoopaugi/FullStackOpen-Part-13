import sequelize from "sequelize"

import Blog from "../blogs/Blog"

const getAll = async () => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.cast(sequelize.fn('count', sequelize.col('author')), 'int'), 'articles'],
      [sequelize.cast(sequelize.fn('sum', sequelize.col('likes')), 'int'), 'likes']
    ],
    group: ['author'],
    order: [['likes', 'DESC']]
  })

  return authors
}

export default { getAll }
