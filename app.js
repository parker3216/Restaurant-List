const express = require('express')// 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override

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
app.use(methodOverride('_method'))



app.listen( port ,() =>{
  console.log(`Listening on http://localhost:${port}`)
})