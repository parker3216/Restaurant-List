//載入Express 和 express.Router
const express = require('express')
const router = express.Router()
const User = require('../../models/user') //引用User Model
const passport = require('passport') //引用passport
const bcrypt = require('bcryptjs')//引用bcrypt

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
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message:'所有欄位都是必填'})
  }
  if (password !== confirmPassword) {
    errors.push({ message:'密碼與確認密碼不相符！'})
  }
  if (errors.length) {
    return res.render('register' ,{
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  //檢查使用者是否已註冊
  User.findOne({ email })
  .then(user => {
  if (user) {
    errors.push({ message: '此Email已註冊過'})
     return res.render('register',{
      errors,
      name,
      email,
      password,
      confirmPassword
    }) 
  } 
    return bcrypt
      .genSalt(10)//產生salt,設立複雜度係數為10
      .then(salt =>bcrypt.hash(password, salt))//使用者密碼加salt產生hash值
      .then(hash => User.create({
        name,
        email,
        password: hash //用hash值取得原來的使用者密碼
      }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
  })

//設定登出路由
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已登出！')
  res.redirect('/users/login')
})


module.exports = router
