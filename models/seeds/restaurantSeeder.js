const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require("../../restaurant.json").results //載入清單

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB


const db = mongoose.connection // 取得資料庫連線狀態

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('loading restaurantSeeder data!')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log("done")
    })
    .catch(() => {
      console.log("error")
    })
})