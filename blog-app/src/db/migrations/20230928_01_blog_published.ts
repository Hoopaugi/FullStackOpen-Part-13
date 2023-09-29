import { Sequelize } from "sequelize-typescript"
import { DataTypes } from "sequelize"

import { Migration } from "../migrate"

export const up: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().addColumn('blogs', 'published', {
    type: DataTypes.INTEGER,
    allowNull: false
  })
}

export const down: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().removeColumn('blogs', 'published')
}
