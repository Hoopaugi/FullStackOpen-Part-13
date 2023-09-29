import { Sequelize } from "sequelize-typescript"
import { DataTypes } from "sequelize"

import { Migration } from "../migrate"

export const up: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().createTable('blogs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  await sequelize.getQueryInterface().createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {  })
  await sequelize.getQueryInterface().addColumn('blogs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  })
}

export const down: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().dropTable('blogs')
  await sequelize.getQueryInterface().dropTable('users')
}
