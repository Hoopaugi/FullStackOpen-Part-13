import db from "../db";
import authServices from "./auth.services";

import { seedUsers } from "../../tests/utils";

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

describe('Login', () => {
  test('Login with valid credentials returns a token', async () => {
    const token = await authServices.login("tester", "secret")
  
    expect(token!.token).toBeDefined()
  });

  test('Login with invalid credentials fails', async () => {
    await expect(authServices.login("tester", "secret2")).rejects.toThrow()
  });
})
