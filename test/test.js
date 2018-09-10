let assert = require('assert');

let greet = require('../greet-logic');

const pg = require("pg");
const Pool = pg.Pool;



// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greeted';

const pool = new Pool({
    connectionString
});


describe('Greeting', function () {
      it('should greet Lihle in Xhosa', async function () {
        var factoryF =  greet(pool)

       let greeting = await factoryF.greetFunction('Xho', "Lihle");
        assert.equal(greeting ,'Molo, LIHLE')
      });

      it('should greet Lihle in English', async function () {
        var factoryF = greet(pool)

      let greeting =  await factoryF.greetFunction( 'Eng', "Lihle");
        assert.equal(greeting ,'Hello, LIHLE')
      });
      it('should greet Lihle in Afrikaans', async function () {
        var factoryF = greet(pool)

        let greeting = await factoryF.greetFunction( 'Afri' , "Lihle");
        assert.equal(greeting ,'Halo, LIHLE')
      });


      it('should count how many people greeted', async function () {
        var factoryF = greet(pool)

        await factoryF.greetFunction("Amand", 'Afri');
        await factoryF.greetFunction("Aphiwe", 'Xho');
        await factoryF.greetFunction("Londi", 'Eng');

        let counter = await factoryF.countLocal();        
        assert.equal(1, counter);
      });

      it('count same person but in Upper and Lowercase',async function () {
        var factoryF = greet(pool)

        await factoryF.greetFunction("Ludwe", 'Afri');
        await factoryF.greetFunction("ludwe", 'Afri');
        await factoryF.greetFunction("LUDWE", 'Afri');


        assert.equal(await factoryF.countLocal(), 1)
      });



      it('it shouldnt count when no one has been greeted', async function () {
        var factoryF = greet(pool)

        await factoryF.greetFunction("", '');
        await factoryF.greetFunction("", '');
        await factoryF.greetFunction("", '');


        assert.equal(await factoryF.countLocal(), 1 );
      })


      describe('check if data base is reset', function(){

        beforeEach(async function(){
            // clean the tables before each test run
            await pool.query("delete from users;");
          
        });
      });
      after(function(){
        pool.end();
    })
    });