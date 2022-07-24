const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// set template engine
app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// set routes 
app.get('/',(req,res) =>{
  res.render('index',{ restaurants:restaurantList.results})
})

app.get('/restaurants/:restaurant_id',(req,res) =>{
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurant_id))
  
  res.render('show',{ restaurant:restaurant })
})

app.get('/search',(req,res)=> {
  const keyword = req.query.keyword 
  const restaurants = restaurantList.results.filter( restaurant =>
     restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.includes(keyword.trim().toLowerCase()))

  res.render('index',{restaurants:restaurants, keyword:keyword})
})

// listen on the Express server
app.listen( port ,() =>{
  console.log(`Listening on http://localhost:${port}`)
})