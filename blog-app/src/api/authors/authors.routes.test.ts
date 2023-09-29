import request from 'supertest'

import app from "../../app";
import db from '../../db';
import { seedDatabase } from '../../db/utils';

beforeEach(async () => {
  await seedDatabase()
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
