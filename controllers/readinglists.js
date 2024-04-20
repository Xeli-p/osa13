const router = require('express').Router()
const { User, Readinglist } = require('../models')
const { tokenExtractor, validityChecker } = require('../util/middleware')

router.get('/', async (req, res) => {
  const readings = await Readinglist.findAll({})
  res.json(readings)
})

router.put('/:id', tokenExtractor, validityChecker, async (req, res) => {
  const reading = await Readinglist.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)
  if (reading.userId === user.id){
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  }
  res.status(400).end()
})

router.post('/', async (req, res) => {
    const reading = await Readinglist.create({blogId: req.body.blog_id, userId: req.body.user_id})
    res.json(reading)
})

module.exports = router