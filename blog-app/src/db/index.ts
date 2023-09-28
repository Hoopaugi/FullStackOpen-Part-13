import { Sequelize } from "sequelize-typescript";

import { DATABASE_URL, NODE_ENV } from "../config";

import Blog from "../api/blogs/Blog";
import User from "../api/users/User";

export let sequelize: Sequelize

if (NODE_ENV === 'test') {
  sequelize = new Sequelize(
    'sqlite::memory:',
    {
      logging: false,
      dialectOptions: {
        decimalNumbers: true
      }
    }
  );
} else if (!DATABASE_URL) {
  throw new Error('DATABASE_URL missing from ENV')
} else {
  console.log(`[Server] Connecting to database at ${DATABASE_URL}`)

  sequelize = new Sequelize(DATABASE_URL);
}

const connect = async () => {
  try {
    await sequelize.authenticate()

    if (NODE_ENV !== 'test') {
      console.log('[Server] Connected to the database')
    }

    sequelize.addModels([Blog, User])

    await sequelize.sync()
  } catch (err) {
    console.log('[Server] Failed to connect to the database')

    return process.exit(1)
  }
}

const sync = async () => {
  await sequelize.sync()
}

const drop = async () => {
  await Blog.drop()
  await User.drop()
}

export default { connect, drop, sequelize, sync }
