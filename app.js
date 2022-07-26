const express = require('express')// 載入 express 並建構應用程式伺服器
const session = require('express-session')//載入express-session
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override
const flash = require('connect-flash') //引用flash套件
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')//引用Passport設定檔



const routes = require('./routes') //引用路由器
require('./config/mongoose')//引用mongoose連線設定



const PORT = process.env.PORT
const app = express()



app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//使用session套件
app.use(session({
  secret: process.env.SESSION_SECRET, //驗證session id的字串
  resave: false,  //不強制把session更新到session store
  saveUninitialized: true //將未初始化的session存回session store
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)//使用usePassport並傳入app參數
app.use(flash())//掛載flash套件

//設定view可使用的middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


app.use(routes)


app.listen( PORT ,() =>{
  console.log(`Listening on http://localhost:${PORT}`)
})