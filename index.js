const express = require('express')
require('express-async-errors')
const app = express()
const middleware = require('./util/middleware')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const authorRouter = require('./controllers/authors')
const readingRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

app.use(express.json())


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingRouter)

app.use(middleware.errorHandler)

//const PORT = process.env.PORT || 3001

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
