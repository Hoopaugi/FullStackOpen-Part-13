import { Sequelize } from "sequelize-typescript"
import { DataTypes } from "sequelize"

import { Migration } from "../migrate"

export const up: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().addColumn('reading_list_items', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false
  })
  await sequelize.getQueryInterface().addColumn('reading_list_items', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false
  })
}

export const down: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().removeColumn('reading_list_items', 'created_at')
  await sequelize.getQueryInterface().removeColumn('reading_list_items', 'updated_at')
}
