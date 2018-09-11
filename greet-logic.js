module.exports = function (pool) {

  // var stored = {};
  // var greetings = '';
  // var greetCounter = 0;

  async function greetFunction(language, name) {
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

  function myGreet() {
    return greetings;
  }

  async function countLocal(counter) {
    let counting = await pool.query('select count(user_name) from users')
    let nameRows = counting;
    return nameRows.rowCount;
  }


  // function returnNamesLocal() {
  //   return stored;

  // }



  async function resetBtn() {
    reset = await pool.query('delete from users;')
  }


  return {
    greetFunction,
    countLocal,
    // returnNamesLocal,
    myGreet,
    resetBtn,
    // counting
  }
}