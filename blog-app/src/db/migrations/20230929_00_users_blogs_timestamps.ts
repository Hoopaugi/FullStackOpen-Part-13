import { Sequelize } from "sequelize-typescript"
import { DataTypes } from "sequelize"

import { Migration } from "../migrate"

export const up: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().addColumn('blogs', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false
  })
  await sequelize.getQueryInterface().addColumn('blogs', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false
  })

  await sequelize.getQueryInterface().addColumn('users', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false
  })
  await sequelize.getQueryInterface().addColumn('users', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false
  })
}

export const down: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().removeColumn('blogs', 'created_at')
  await sequelize.getQueryInterface().removeColumn('blogs', 'updated_at')

  await sequelize.getQueryInterface().removeColumn('users', 'created_at')
  await sequelize.getQueryInterface().removeColumn('users', 'updated_at')
}
