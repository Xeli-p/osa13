const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')


class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isWithinRange(value) {
        const currentYear = new Date().getFullYear()
        if (value < 1991 || value > currentYear) {
          throw new Error(`year must be between 1991 and ${currentYear}`)
        }
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

// Blog.sync()

module.exports = Blog