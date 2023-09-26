import request from 'supertest'

import app from "../app";
import db from '../db';
import { seedUsers } from '../../tests/utils';

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

describe("/auth/login", () => {
  it("Should succeed with valid credentials", async () => {
    const credentials = { username: 'tester', password: 'secret' }

    const res = await request(app).post("/auth/login").send(credentials)

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("Should fail with invalid credentials", async () => {
    const credentials = { username: 'tester', password: 'password' }

    const res = await request(app).post("/auth/login").send(credentials)

    expect(res.statusCode).toBe(400);
    expect(res.body.token).not.toBeDefined();
  });
});