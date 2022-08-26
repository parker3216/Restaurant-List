const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users') //載入users model


router.use('/', home)
router.use('/restaurants' , restaurants)
router.use('/users', users)//引用users model

module.exports = router 