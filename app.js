const express = require('express')// 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes') //引用路由器
require('./config/mongoose')//引用mongoose連線設定

const port = 3000
const app = express()



app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen( port ,() =>{
  console.log(`Listening on http://localhost:${port}`)
})