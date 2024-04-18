const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs','year', {
      type: DataTypes.INTEGER,
      validate: {
        isWithinRange(value) {
          const currentYear = new Date().getFullYear()
          if (value < 1991 || value > currentYear) {
            throw new Error(`year must be between 1991 and ${currentYear}`)
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}