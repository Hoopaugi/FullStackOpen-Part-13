import { Sequelize } from "sequelize-typescript"
import { DataTypes } from "sequelize"

import { Migration } from "../migrate"

export const up: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
}

export const down: Migration = async ({ context: sequelize }: { context:  Sequelize}) => {
  await sequelize.getQueryInterface().removeColumn('users', 'disabled')
}
