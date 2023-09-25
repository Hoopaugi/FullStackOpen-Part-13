import db from "../../db"
import blogsServices from "./blogs.services";
import { seedBlogs } from "../../../tests/utils";

beforeAll(async () => {
  await db.connect()

  await seedBlogs()
})

describe('Get all blogs', () => {
  test('All blogs are fetched correctly', async () => {
    const blogs = await blogsServices.getAll()
  
    expect(blogs.length).toBe(5);
  });
})

describe('Get individual blog', () => {
  test('Individual blog with valid id is fetched correctly', async () => {
    const blog = await blogsServices.getById('1')

    expect(blog).toBeDefined()
    expect(blog!.title).toBe('Introducing the React Mega-Tutorial');
  });
})

describe('Create new blog', () => {
  test('New blog with valid fields can be created', async () => {
    const newBlog = {
      author: "Miguel Grinberg",
      url: "https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-5-connecting-to-a-back-end",
      title: "The React Mega-Tutorial, Chapter 5: Connecting to a Back End",
      likes: 0
    }

    const blog = await blogsServices.create(newBlog)

    expect(blog).toBeDefined()
    expect(blog!.title).toBe(newBlog.title)
    expect(blog!.url).toBe(newBlog.url)
    expect(blog!.author).toBe(newBlog.author)
    expect(blog!.likes).toBe(newBlog.likes)
  });
})
