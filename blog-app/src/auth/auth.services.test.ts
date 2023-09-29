import db from "../db";
import authServices from "./auth.services";

import { initialUsers, seedDatabase } from "../db/utils";

beforeEach(async () => {
  await seedDatabase()
})

afterEach(async () => {
  await db.drop()

  await db.sync()
})

describe('Login', () => {
  test('Login with valid credentials returns a token', async () => {
    const token = await authServices.login({ ...initialUsers[0] })
  
    expect(token!.token).toBeDefined()
  });

  test('Login with invalid credentials fails', async () => {
    await expect(authServices.login({ ...initialUsers[0], password: 'wrongpassword' })).rejects.toThrow()
  });
})
