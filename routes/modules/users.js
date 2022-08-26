//載入Express 和 express.Router
const express = require('express')
const router = express.Router()
const User = require('../../models/user') //引用User Model
const passport = require('passport') //引用passport

router.get('/login', (req,res) =>{
  res.render('login')
})

//設定登入路由
router.post('/login', passport.authenticate('local',{      
  successRedirect: '/',
  failureRedirect:'/users/login'
}))

router.get('/register', (req, res) =>{
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得註冊參數
  const { name, email , password, confirmPassword } = req.body
  //檢查使用者是否已註冊
  User.findOne({ email })
  .then(user => {
    //已註冊則退回原畫面
  if (user) {
    console.log('User already exists.')
    res.render('register',{
      name,
      email,
      password,
      confirmPassword
    }) 
  } else{
    //尚未註冊則寫入資料庫
    return User.create({
      name,
      email,
      password
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  }
  })
  .catch(err => console.log(err))
})
//設定登出路由
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})








module.exports = router
