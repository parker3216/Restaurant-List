const express = require('express')// 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error',() =>{
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () =>{
  console.log('mongodb connected!')
})

const app = express()
const port = 3000


app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//新增頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//新增餐廳資料
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除餐廳資料
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查看全部餐廳
app.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//查看特定餐廳
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//搜尋餐廳
app.get('/search', (req, res) => {
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

//修改頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//修改餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(error => console.log(error))
})

app.listen( port ,() =>{
  console.log(`Listening on http://localhost:${port}`)
})