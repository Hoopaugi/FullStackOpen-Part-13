import Blog from "../api/blogs/Blog"
import User from "../api/users/User"
import { toNewUser } from "../api/users/users.utils"
import { toNewBlog } from "../api/blogs/blogs.utils"
import blogs from './seeds/blogs.json'
import users from './seeds/users.json'

export const initialUsers = users
export const initialBlogs = blogs

export let initialUser: User

export const seedDatabase = async () => {
  for (const user of users) {
    const newUser = await toNewUser(user)

    await User.create(newUser)
  }

  const user = await User.findByPk(1, { include: [Blog] })

  if (user) {
    initialUser = user

    for (const blog of blogs) {
      const newBlog = toNewBlog({ ...blog, authorizedUser: initialUser})

      await Blog.create(newBlog)
    }
  } else {
    throw new Error('Should not happen')
  }
}
