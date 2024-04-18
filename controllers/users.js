const router = require('express').Router()

const { User, Blog, Readinglist } = require('../models')

const { Op } = require('sequelize')

router.get('/', async (req, res) => {

  const users = await User.findAll({
      include: [
        /*
        {
          model: Blog,
          attributes: { exclude: ['userId'] }
        },
        */
        {
          model: Blog,
          as: 'blogsReading',
          attributes: {exclude: ['userId']},
          through: {
            attributes: []
          },
        }
      ]

    })
  res.json(users)
})

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

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.get('/:id', async (req, res) => {

  let where = req.query.read 
  ? { read: req.query.read === 'true' ? true : false }
  : {}

  if (req.query.search && req.query.read !== undefined) {
    where = {
      read: Boolean(req.query.read)
    }
  }
  

  const user = await User.findByPk(req.params.id, {
    exclude: ['blogs'],
    include: 
    [
      {
        model: Blog,
        as: 'blogsReading',
        attributes: {exclude: ['userId']},
        through: {
          attributes: ['read', 'id'],
          where
        },        
      }
    ]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router