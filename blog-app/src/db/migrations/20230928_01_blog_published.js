// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn('blogs', 'published', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.removeColumn('blogs', 'published')
  },
}
