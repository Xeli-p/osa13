const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const Session = require('../models/session')

router.post('/', tokenExtractor, async (request, response) => {

  await Session.destroy({ where: { userId: request.decodedToken.id }})

  response
    .status(204)
    .send({})
})

module.exports = router