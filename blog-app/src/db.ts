import { Sequelize } from "sequelize";

import { DATABASE_URL } from "./config";

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL missing from ENV')
}

const sequelize = new Sequelize(DATABASE_URL);

export default sequelize
