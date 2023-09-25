import { Sequelize } from "sequelize-typescript";

import { DATABASE_URL } from "./config";

import Blog from "./api/blogs/Blog";
import User from "./api/users/User";

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL missing from ENV')
}

export const sequelize = new Sequelize(DATABASE_URL);

const connect = async () => {
  try {
    console.log(`[Server] Connecting to database at ${DATABASE_URL}`)

    await sequelize.authenticate()

    console.log('[Server] Connected to the database')

    sequelize.addModels([Blog, User])

    await sequelize.sync()
  } catch (err) {
    console.log('[Server] Failed to connect to the database')

    return process.exit(1)
  }
}

export default { connect, sequelize }
