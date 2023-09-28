import User from "../users/User"
import Blog from "../blogs/Blog"

export const toNewReadinglist = (blog: Blog, user: User) => {
  return {
    userId: user.id,
    blogId: blog.id
  }
}
