const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)


User.belongsToMany(Blog, { through: Readinglist, as: 'blogsReading' })
Blog.belongsToMany(User, { through: Readinglist, as: 'ReadingBlogs' })

// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  User, Blog, Readinglist
}