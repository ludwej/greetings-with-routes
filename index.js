let express = require('express')
let app = express()
// let settings = 0;
// let assert = require('assert')
let greet = require('/home/codex-admin/projects/greetings-with-routes/greet-logic.js')

const greetings = greet() ;

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

app.get('/', function (req, res) {
   let greetP = greetings.greetFunction();
//    let count = greetings.returnNamesLocal();

    res.render('home', {
        greetP
        // count

    });
  });
  app.post('/greet', function (req, res) {
    const Xhosa = req.body.Xho;
    const Afrikaans = req.body.Afri;
    const English = req.body.Engl
  
   
  
    res.redirect('/');
  });
  

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});