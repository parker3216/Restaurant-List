// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
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

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// set template engine
app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// set routes 
app.get('/',(req,res) =>{
  res.render('index',{ restaurants:restaurantList.results})
})

app.get('/restaurants/:restaurant_id',(req,res) =>{
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurant_id))
  
  res.render('show',{ restaurant:restaurant })
})

app.get('/search',(req,res)=> {
  const keyword = req.query.keyword 
  const restaurants = restaurantList.results.filter( restaurant =>
     restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim().toLowerCase()))

  res.render('index',{restaurants:restaurants, keyword:keyword})
})

// listen on the Express server
app.listen( port ,() =>{
  console.log(`Listening on http://localhost:${port}`)
})