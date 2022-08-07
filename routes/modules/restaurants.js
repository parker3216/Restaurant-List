// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurant')

const Restaurant = require('../../models/restaurant') //引用Restaurant model

//新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增餐廳資料
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除餐廳資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查看特定餐廳
router.get("/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//修改餐廳資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(error => console.log(error))
})

//匯出模組
module.exports = router