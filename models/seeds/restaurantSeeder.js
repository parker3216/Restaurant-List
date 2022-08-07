const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require("../../restaurant.json").results //載入清單

const db = require('../../config/mongoose') // 引用mongoose連線

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