const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'blogsReading' })
Blog.belongsToMany(User, { through: Readinglist, as: 'ReadingBlogs' })

Session.belongsTo(User)
User.hasMany(Session)

module.exports = {
  User, Blog, Readinglist, Session
}