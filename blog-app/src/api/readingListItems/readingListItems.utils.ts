import User from "../users/User"
import Blog from "../blogs/Blog"

export const toNewReadingListItem = (blog: Blog, user: User) => {
  return {
    userId: user.id,
    blogId: blog.id,
    read: false
  }
}
