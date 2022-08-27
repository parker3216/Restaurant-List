// 載入 Express 及 Express Router
const express = require('express')
const router = express.Router()

// 引用 Restaurant Model
const Restaurant = require('../../models/restaurant')

// 設定路由
router.get('/aSort', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

router.get('/zSort', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

router.get('/categorySort', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ category: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

router.get('/areaSort', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ location: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

// 匯出模組
module.exports = router
