import request from 'supertest'

import app from "../app";
import db from '../db';
import { initialUsers, seedDatabase } from '../db/utils';

beforeAll(async () => {
  await db.connect()
})

beforeEach(async () => {
  await seedDatabase()
})

afterEach(async () => {
  await db.drop()

  await db.sync()
})

describe("/auth/login", () => {
  it("Should succeed with valid credentials", async () => {
    const credentials = { ...initialUsers[0] }

    const res = await request(app).post("/auth/login").send(credentials)

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("Should fail with invalid credentials", async () => {
    const credentials = { ...initialUsers[0], password: 'wrongpassword' }

    const res = await request(app).post("/auth/login").send(credentials)

    expect(res.statusCode).toBe(400);
    expect(res.body.token).not.toBeDefined();
  });
});