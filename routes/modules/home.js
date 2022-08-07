// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') //引用Restaurant model

//餐廳首頁
router.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  if (keyword.length === 0) {
    return res.redirect('/')
  }
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword))
      if (filterRestaurants.length === 0) {
        return res.redirect('/')
      }
      res.render('index', { restaurants: filterRestaurants, keyword: keyword })
    })
    .catch(error => console.log(error))
})

//匯出模組
module.exports = router