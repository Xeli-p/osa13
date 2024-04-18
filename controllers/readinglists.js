const router = require('express').Router()
const { User, Blog, Readinglist } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const readings = await Readinglist.findAll({

    })
  res.json(readings)
})


/*
router.put('/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
    if (user) {
      user.username = req.body.username
      user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  })
*/

router.put('/:id', tokenExtractor, async (req, res) => {
  const reading = await Readinglist.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)
  //console.log(reading, user)
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

/*router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})*/

module.exports = router