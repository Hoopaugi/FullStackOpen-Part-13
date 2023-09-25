import Blog from "../src/api/blogs/Blog"
import blogs from './seeds/blogs.json'

export const seedBlogs = async () => {
  for (const blog of blogs) {
    await Blog.create(blog)
  }
}
