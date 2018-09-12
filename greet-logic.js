module.exports = function (pool) {

  // var stored = {};
  // var greetings = '';
  // var greetCounter = 0;

  async function greetFunction(language, name) {
    try{
      name = name.toUpperCase() ;

    if (name != '' && language !== undefined) {

      // if (stored[name] === undefined) {
      //   stored[name] = 0;

        let names = await pool.query('SELECT * FROM users WHERE user_name = $1 ', [name]);
        console.log(names)

        if (names.rowCount === 0) {
          await pool.query('INSERT into users (user_name, count) values($1, $2)', [name, 0]);
        } 
        
          await pool.query('update users set count=count+1 where user_name=$1', [name])
      
        if (language === 'Eng') {
          return 'Hello, ' + name;
        }

        if (language === 'Xho') {
          return 'Molo, ' + name;
        }
        if (language === 'Afri') {
          return 'Halo, ' + name;
        }
      
    }
    }
    catch(err){

    }
    
  }

  function myGreet() {
    return greetings;
  }

  async function countLocal(counter) {
    try{
      let counting = await pool.query('select count(user_name) from users')
    let nameRows = counting;
    return nameRows.rowCount;
    }
    catch(err){}
  }


  async function greetsCounted() {
    let namesCounted = await pool.query('select * from users')
    return namesCounted.rowCount;

  }



  async function resetBtn() {
    try{
      reset = await pool.query('delete from users;')
    }
    catch(err){}
  }


  return {
    greetFunction,
    countLocal,
    greetsCounted,
    myGreet,
    resetBtn,
    // counting
  }
}