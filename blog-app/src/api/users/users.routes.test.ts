import request from 'supertest'

import app from "../../app";
import db from '../../db';
import { initialUsers, seedUsers } from '../../../tests/utils';

beforeAll(async () => {
  await db.connect()
})

beforeEach(async () => {
  await seedUsers()
})

afterEach(async () => {
  await db.drop()

  await db.sync()
})

describe("POST /api/users", () => {
  it("Creating new user should succeed with valid fields", async () => {
    const user = {
      username: 'tester2@example.com',
      name: 'Test User 2',
      password: 'password'
    }

    const res = await request(app).post("/api/users").send(user)

    expect(res.statusCode).toBe(201);
    expect(res.body.passwordHash).not.toBeDefined();
  });
});