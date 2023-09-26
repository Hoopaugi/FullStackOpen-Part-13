import request from 'supertest'

import app from "../../app";
import db from '../../db';
import { initialUsers, seedDatabase } from '../../../tests/utils';

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

describe("GET /api/users", () => {
  it("Users are fetched correctly", async () => {
    const res = await request(app).get("/api/users")

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(initialUsers.length);
  });

  it("Individual users with correct ID can be fetched", async () => {
    const firstUser = initialUsers[0]
    
    const res = await request(app).get(`/api/users/${firstUser.username}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toEqual(firstUser.username);
  });

  it("Individual users with invalid ID return 404", async () => {
    const res = await request(app).get("/api/users/doesnotexist@nowhere.com")

    expect(res.statusCode).toBe(404);
  });
});

describe("POST /api/users", () => {
  it("Creating new user should succeed with valid fields", async () => {
    const user = {
      username: 'tester3@example.com',
      name: 'Test User 3',
      password: 'password'
    }

    const res = await request(app).post("/api/users").send(user)

    expect(res.statusCode).toBe(201);
    expect(res.body.passwordHash).not.toBeDefined();
  });
});