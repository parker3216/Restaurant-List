const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const sort = require('./modules/sort')//載入sort model
const users = require('./modules/users') //載入users model
const auth = require('./modules/auth')//載入auth model
const { authenticator } = require('../middleware/auth') //載入middleware



router.use('/restaurants', authenticator, restaurants)//加入驗證程序
router.use('/users', users)//引用users model
router.use('/sort', authenticator, sort)//加入驗證程序
router.use('/auth',auth)//引用auth model
router.use('/', authenticator, home)//加入驗證程序


module.exports = router 