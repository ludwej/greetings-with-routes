let express = require('express')
let app = express()
let flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-admin:code321@localhost:5432/greeted';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });


let greeting = require('./greet-logic.js')

let greet = greeting(pool);

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
  try{
 // let greetP = greetings.greetFunction();
 let count = await pool.query('select count(user_name) from users;')
 let counter = count.rows[0].count

  res.render('home', {
    counter

  });
  }
  catch(err){}
  
 
  });


  app.post('/greet', async function (req, res) {
    try{
      const language = req.body.language;
    const name = req.body.name;

    //if (name !== undefined) {
     //await pool.query('insert into users (user_name, count) values ($1, $2)', [name, 1]);
     // await greet.greetFunction(language, name);
    // }
    if (name === '' && language == undefined ){
      req.flash('info', 'Please Enter Name & Select Language')
    }

    else if(name === '' ) {
      req.flash('info', 'Please Enter a Name')
      
    }


      else if(language == undefined){
        req.flash('info', 'Please Select Language')
      }

     
      
    //   else {
    //     greet.greetFunction(language,name)
       
    //   }
    

      let greetings = { 
        message : await greet.greetFunction(language, name) ,
        count : await greet.greetsCounted()
      }

   

  //   let greetP = greetings.greetFunction(language,name)
  //   let count = greetings.countLocal();
  //  console.log(greetings.greetFunction(language,name))
  
    res.render ('home' , {
      greetings
    });
    }
    catch(err){

    }
  });
  

  app.post('/home',async function (req, res) {


    res.render('home')
  });


  app.post('/resetDB', async function (req, res) {
    let deleteUsers = await greet.resetBtn()
   


    res.render('greeted', {deleteUsers})
  });


  app.post('/reset', async function (req, res) {
    let deleteUsers = await greet.resetBtn()
   


    res.render('home', {deleteUsers})
  });

  
  
  app.get('/greeted', async function (req, res) {
    try{
      let results = await pool.query('select * from users;')
    let greetedUser = results.rows

    let counter = await greet.countLocal()
 

      console.log(counter)
    
     res.render('greeted', { greetedUser, counter});
    }
    catch(err){}
   });

  
 


let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});




// const pool = new Pool({
//   database : 'greeted',
//   user : 'codex-admin',
//   host : 'localhost',
//   password : 'code321' ,
//   port : 5432
//   })
// // we are using a special test database for the tests
// const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432';

// let settings = 0;
// let assert = require('assert')