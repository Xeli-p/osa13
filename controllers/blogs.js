const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
      where = {[Op.or]:[
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ]}
    }
  

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order: [
          ['likes', 'DESC']
        ]
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
    console.log(req.body)
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date()})
    res.json(blog)
})

router.put('/:id', async (req, res) => {
    console.log(req.body)
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    res.status(200).json(blog)
})

router.delete('/:id', tokenExtractor, async (req,res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog || !blog.userId) {
        res.status(404).json({error: "no blog or blog user found"})
    }
    const user = await User.findByPk(req.decodedToken.id)
    console.log(`req id: ${req.decodedToken.id} blog user: ${blog.userId}`)
    if (user.id === blog.userId) {
        await blog.destroy()
        res.status(204).json({})
    } else {
      res.status(400).json({error:"not a match"})
    }
})

module.exports = router