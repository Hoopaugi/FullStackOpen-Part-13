import request from 'supertest'

import app from "../../app";
import db from '../../db';
import { seedDatabase, initialBlogs, initialUsers, initialUser } from '../../../tests/utils';
import authServices from '../../auth/auth.services';

let token: string

beforeAll(async () => {
  await db.connect()
})

beforeEach(async () => {
  await seedDatabase()

  const credentials = { username: initialUsers[0].username, password: initialUsers[0].password }

  const payload = await authServices.login(credentials)

  token = payload.token
})

afterEach(async () => {
  await db.drop()

  await db.sync()
})

describe("GET /api/blogs", () => {
  it("Blogs are fetched correctly", async () => {
    const res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(initialBlogs.length);

    const firstInitialBlog = initialBlogs[0]
    const firstBlog = res.body[0]

    expect(firstBlog.title).toEqual(firstInitialBlog.title);
    expect(firstBlog.url).toEqual(firstInitialBlog.url);
    expect(firstBlog.author).toEqual(firstInitialBlog.author);
    expect(firstBlog.likes).toEqual(0);
    expect(firstBlog.user.username).toEqual(initialUser.username)
    expect(firstBlog.user.name).toEqual(initialUser.name)
  });

  it("Individual blogs with correct ID can be fetched", async () => {
    const res = await request(app).get("/api/blogs/1")

    const firstBlog = initialBlogs[0]

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(firstBlog.title);
  });

  it("Individual blogs with invalid ID return 404", async () => {
    const res = await request(app).get("/api/blogs/100")

    expect(res.statusCode).toBe(404);
  });

  it("Blogs can be searched for", async () => {
    let res = await request(app).get("/api/blogs?search=Routing")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(1);

    res = await request(app).get("/api/blogs?search=Grinberg")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(5);
  });
});

describe("POST /api/blogs", () => {
  it("Creating a new blog succeeds with valid fields", async () => {
    const blog = {
      title: 'The React Mega-Tutorial, Chapter 5: Connecting to a Back End',
      url: 'https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-5-connecting-to-a-back-end',
      author: 'Miguel Grinberg'
    }

    let res = await request(app).post("/api/blogs").send(blog).set('Authorization', `Bearer ${token}`);

    const newBlogId = res.body.id

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toEqual(blog.title);
    expect(res.body.url).toEqual(blog.url);
    expect(res.body.author).toEqual(blog.author);
    expect(res.body.likes).toEqual(0);
    expect(res.body.userId).toEqual(initialUser.id)

    res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(initialBlogs.length + 1);

    res = await request(app).get(`/api/blogs/${newBlogId}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(blog.title);
    expect(res.body.url).toEqual(blog.url);
    expect(res.body.author).toEqual(blog.author);
    expect(res.body.likes).toEqual(0);
    expect(res.body.userId).toEqual(initialUser.id)
  });

  it("Creating a new blog succeeds with missing author", async () => {
    const blog = {
      title: 'The React Mega-Tutorial, Chapter 5: Connecting to a Back End',
      url: 'https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-5-connecting-to-a-back-end'
    }

    let res = await request(app).post("/api/blogs").send(blog).set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toEqual(blog.title);
    expect(res.body.url).toEqual(blog.url);
    expect(res.body.author).toEqual(undefined);
    expect(res.body.likes).toEqual(0);
    expect(res.body.userId).toEqual(initialUser.id)

    res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(initialBlogs.length + 1);
  });

  it("Creating a new blog fails with missing title", async () => {
    const blog = {
      url: 'https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-5-connecting-to-a-back-end',
      author: 'Miguel Grinberg'
    }

    let res = await request(app).post("/api/blogs").send(blog).set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);

    res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(initialBlogs.length);
  });

  it("Creating a new blog fails with missing url", async () => {
    const blog = {
      title: 'The React Mega-Tutorial, Chapter 5: Connecting to a Back End',
      author: 'Miguel Grinberg'
    }

    let res = await request(app).post("/api/blogs").send(blog).set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);

    res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(initialBlogs.length);
  });
});

describe("PUT /api/blogs", () => {
  it("Blogs likes can be updated", async () => {
    let res = await request(app).get("/api/blogs/1")

    const firstBlog = initialBlogs[0]

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(firstBlog.title);
    expect(res.body.url).toEqual(firstBlog.url);
    expect(res.body.author).toEqual(firstBlog.author);
    expect(res.body.likes).toEqual(0);
    expect(res.body.userId).toEqual(initialUser.id)

    res = await request(app).put("/api/blogs/1").send({ likes: 10 })

    res = await request(app).get("/api/blogs/1")

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(firstBlog.title);
    expect(res.body.url).toEqual(firstBlog.url);
    expect(res.body.author).toEqual(firstBlog.author);
    expect(res.body.likes).toEqual(10);
    expect(res.body.userId).toEqual(initialUser.id)
  });
});

describe("DELETE /api/blogs", () => {
  it("Blog can be deleted by it's user", async () => {
    const newBlog = {
      title: 'Delete Me Title',
      url: 'Delete Me Url',
      author: 'Delete Me Author'
    }

    let res = await request(app).post("/api/blogs").send(newBlog).set('Authorization', `Bearer ${token}`);

    const blogToDelete = res.body

    res = await request(app).get(`/api/blogs/${blogToDelete.id}`)

    expect(res.body.title).toEqual(blogToDelete.title);
    expect(res.body.url).toEqual(blogToDelete.url);
    expect(res.body.author).toEqual(blogToDelete.author);

    res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(6);

    res = await request(app).del(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  it("Fails without authorization", async () => {
    const res = await request(app).del('/api/blogs/1');

    expect(res.statusCode).toBe(401);
  });

  it("Fails with invalid authorization", async () => {
    const newBlog = {
      title: 'Delete Me Title',
      url: 'Delete Me Url',
      author: 'Delete Me Author'
    }

    let res = await request(app).post("/api/blogs").send(newBlog).set('Authorization', `Bearer ${token}`);

    const blogToDelete = res.body

    res = await request(app).get(`/api/blogs/${blogToDelete.id}`)

    expect(res.body.title).toEqual(blogToDelete.title);
    expect(res.body.url).toEqual(blogToDelete.url);
    expect(res.body.author).toEqual(blogToDelete.author);

    res = await request(app).get("/api/blogs")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(6);

    const credentials = { username: initialUsers[1].username, password: initialUsers[1].password }

    const payload = await authServices.login(credentials)
  
    const secondToken = payload.token

    res = await request(app).del(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${secondToken}`);

    expect(res.statusCode).toBe(401);
  });
});
