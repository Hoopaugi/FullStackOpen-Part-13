require('dotenv').config()

const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()

    console.log('Connection has been established successfully.')

    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })

    for (const blogIndex in blogs) {
      const blog = blogs[blogIndex]

      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    }

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
