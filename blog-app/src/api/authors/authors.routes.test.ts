import request from 'supertest'

import app from "../../app";
import db from '../../db';
import { seedDatabase, initialBlogs, initialUsers, initialUser } from '../../db/utils';
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

describe("GET /api/authors", () => {
  it("Authors are fetched correctly", async () => {
    const res = await request(app).get("/api/authors")

    expect(res.statusCode).toBe(200);
    //FIXME: Magic numbers
    expect(res.body.length).toBe(3)
  });
});
