const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant') // 載入 restaurant model
const User = require('../user')
const restaurantList = require("../../restaurant.json").results //載入餐廳清單
const userList = require('../../user.json').results //載入使用者
const db = require('../../config/mongoose') // 引用mongoose連線

db.once('open', () => {
  Promise.all(
    Array.from(userList, (userlist) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(userlist.password, salt))
        .then(hash => User.create({
          name: userlist.name,
          email: userlist.email,
          password: hash
    })
  )
    .then(user => {
      const userId = user._id
      const seedRestaurant = []
      userlist.restaurant_index.forEach(index =>{
        restaurantList[index].userId = userId
        seedRestaurant.push(restaurantList[index])
      })
      return Restaurant.create(seedRestaurant)
    })
  })
)
    .then(()=>{
      console.log('user & restaurant seeders loaded!')
      process.exit() 
    })
    .catch(error => console.log(error))
  })
  
  
  
  
  
  
  
  
 