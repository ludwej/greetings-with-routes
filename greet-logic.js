module.exports = function (pool) {
  async function greetFunction(language, name) {
    try {
      name = name.toUpperCase()

      if (name !== '' && language !== undefined) {
        let names = await pool.query('SELECT * FROM users WHERE user_name = $1 ', [name])

        if (names.rowCount === 0) {
          await pool.query('INSERT into users (user_name, count) values($1, $2)', [name, 0])
        }

        await pool.query('update users set count=count+1 where user_name=$1', [name])

        if (language === 'Eng') {
          return 'Hello, ' + name
        }

        if (language === 'Xho') {
          return 'Molo, ' + name
        }
        if (language === 'Afri') {
          return 'Halo, ' + name
        }
      }
    } catch (err) {

    }
  }

  async function countLocal(counter) {
    try {
      let counting = await pool.query('select count(user_name) from users')
      let nameRows = counting
      return nameRows.rows[0].count
    } catch (err) {}
  }

  async function greetsCounted() {
    try {
      let namesCounted = await pool.query('select * from users')
      return namesCounted.rowCount
    } catch (err) {}
  }

  async function resetBtn() {
    try {
      await pool.query('delete from users;')
    } catch (err) {}
  }

  async function ReadUser (username) {
    let result = await pool.query('SELECT * FROM users WHERE user_name=$1', [username])
    return result.rows
  }

  return {
    greetFunction,
    countLocal,
    greetsCounted,
    resetBtn,
    ReadUser

    // counting
  }
}