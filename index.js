let express = require('express')
let app = express()
let flash = require('express-flash')
const session = require('express-session')
const pg = require('pg')
const Pool = pg.Pool

let useSSL = false
let local = process.env.LOCAL || false
if (process.env.DATABASE_URL && !local) {
  useSSL = true
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-admin:code321@localhost:5432/greeted'

const pool = new Pool({
  connectionString,
  ssl: useSSL
})

let greeting = require('./greet-logic.js')
let routing = require('./routes/routes.js')

let routes = routing(pool)

let greet = greeting(pool)

app.use(session({
  secret: '<add a secret string here>',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())

var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', routes.homeRoute)

app.get('/names/:user_name', routes.usesGreeted)

app.post('/greet', routes.greetingF)

app.post('/home', routes.home)
app.post('/resetDB', routes.resetDb)

app.post('/reset', routes.reset)

app.get('/greeted', routes.greeted)

let PORT = process.env.PORT || 3010

app.listen(PORT, function () {
  console.log('App starting on port', PORT)
})
