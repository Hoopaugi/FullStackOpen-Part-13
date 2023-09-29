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
  sequelize = new Sequelize(DATABASE_URL);
}

import { migrator } from "./migrate";

const connect = async () => {
  try {
    if (NODE_ENV !== 'test') {
      console.log(`[Server] Connecting to database at ${DATABASE_URL}`)
    }

    await sequelize.authenticate()

    if (NODE_ENV !== 'test') {
      console.log('[Server] Connected to the database')
    }

    sequelize.addModels([Blog, User])

    const migrations = await migrator.up()

    console.log('Migrations up to date', {
      files: migrations.map((mig) => mig.name),
    })
  } catch (err) {
    console.log('[Server] Failed to connect to the database')
    console.log(err)
    return process.exit(1)
  }
}

const sync = async () => {
  //await sequelize.sync()
  console.log('sync')
}

const drop = async () => {
  //await Blog.drop()
  //await User.drop()
  console.log('drop')
}

export default { connect, drop, sequelize, sync }
