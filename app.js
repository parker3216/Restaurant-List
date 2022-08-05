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


//const restaurantList = require('./restaurant.json')

// set template engine
app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))



//新增餐廳首頁
app.get('/restaurants/new' , (req,res) =>{
  return res.render('new')
})
//新增餐廳
app.post('/restaurants', (req, res) => {
  //onst data = req.body      // 從 req.body 拿出表單裡的資料
  Restaurant.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})


// 查看全部餐廳
app.get('/',(req,res) =>{
  Restaurant.find({})
  .lean()
  .then(restaurants => res.render('index', { restaurants }) )
  .catch(error => console.log(error))
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