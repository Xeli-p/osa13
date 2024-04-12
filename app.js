const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then( () => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        logger.error(error)
    })

    app.use((err, req, res, next) => {
        logger.error(err.stack);
        res.status(500).send('Something went wrong!');
    });


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use((err, req, res, next) => {
    logger.error(err, req, res, next);
});

module.exports = app