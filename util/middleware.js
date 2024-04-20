const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const validityChecker = async (req, res, next) => {
  const authorization = req.get('authorization')
  const session = await Session.findOne({where: {userId: req.decodedToken.id, token: authorization.substring(7)}})
  const user = await User.findOne({where: {id: req.decodedToken.id, disabled: false}})
  if (!(session && user)) {
    return res.status(401).json({ error: 'session invalid'})
  }
  next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'bad request' })

    } 
    if ( error.name === 'SequelizeValidationError' ) {
        return response.status(400).json({ error: error.message })
    } else {
        return response.status(400).json({ error: error })
    }
}

module.exports = { errorHandler, tokenExtractor, validityChecker }