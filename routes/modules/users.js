//載入Express 和 express.Router
const express = require('express')
const router = express.Router()
router.get('/login', (req,res) =>{
  res.render('login')
})

module.exports = router