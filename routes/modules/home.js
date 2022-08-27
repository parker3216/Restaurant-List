// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') //引用Restaurant model

//餐廳首頁
router.get('/', (req, res) => {
  const userId =req.user._id  //變數設定
  Restaurant.find({ userId }) //增加查詢條件
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//搜尋餐廳頁面
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  if (keyword.length === 0) {
    return res.redirect('/')
  }
  const userId = req.user._id
  const regexp = new RegExp(keyword, 'i')

  Restaurant.find({ $and: [{ userId }, {$or: [{ name: regexp }, { category: regexp }]}] }) //新增userId並透過$and,$or去篩選屬於user的資料
    .lean()
    .then(restaurants => 
      res.render('index', { restaurants, keyword })
    )
    .catch(error => console.log(error))
})

//匯出模組
module.exports = router