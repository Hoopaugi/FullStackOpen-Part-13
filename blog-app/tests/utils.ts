import Blog from "../src/api/blogs/Blog"
import blogs from './seeds/blogs.json'
import User from "../src/api/users/User"
import users from './seeds/users.json'
import { hashPassword } from "../src/utils"

export const initialUsers = users
export const initialBlogs = blogs

export const seedBlogs = async () => {
  for (const blog of blogs) {
    await Blog.create(blog)
  }
}

export const seedUsers = async () => {
  for (const user of users) {
    const passwordHash = await hashPassword(user.password)

    await User.create({ username: user.username, name: user.name, passwordHash })
  }
}
