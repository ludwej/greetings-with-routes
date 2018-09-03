let express = require('express')
let app = express()
let flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;


const pool = new Pool({
  database : 'greeted',
  user : 'codex-admin',
  host : 'localhost',
  password : 'code321' ,
  port : 5432
  
  })
// we are using a special test database for the tests
// const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432';

// let settings = 0;
// let assert = require('assert')
let greet = require('/home/codex-admin/projects/greetings-with-routes/greet-logic.js')

const greetings = greet();

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));
  // initialise the flash middleware
  app.use(flash());

var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');


app.use(express.static('public'))

app.get('/', async function (req, res) {
   let greetP = greetings.greetFunction();
   let count = greetings.countLocal();

    res.render('home', {
        greetP,
        count

    });
  });


  app.post('/greet', async function (req, res) {
    const language = req.body.language;
    const name = req.body.name;

    if (name !== undefined) {
      await pool.query('insert into users (user_name, count) values ($1, $2)', [name, 1]);
      greetings.greetFunction(name, language);
    }
    if (name === '' && language == undefined ){
      req.flash('info', 'Please Enter Name & Select Language')
    }

    else if(name === '' ) {
      req.flash('info', 'Please Enter a Name')
      
    }


      else if(language == undefined){
        req.flash('info', 'Please Select Language')
      }

     
      
      else {
        greetings.greetFunction(language,name)
       
      }
    
     

    let greetP = greetings.greetFunction(language,name)
    let count = greetings.countLocal();
   console.log(greetings.greetFunction(language,name))
  
    res.render ('home' , {
        greetP,
        count
    });
  });
  
  // app.post('/resetBtn', function (req, res) {
  //   greetings.resetBtn();
  
  //   res.render('home')
  // });
  
  app.get('/greeted', async function (req, res) {
    let results = await pool.query('select * from users;')
    let greetedUser = results.rows;
 
     res.render('greeted', { greetedUser });
   });

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});