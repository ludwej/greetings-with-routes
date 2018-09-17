module.exports = function (pool) {
    let greeting = require('../greet-logic')
  let greet = greeting(pool)

  async function homeRoute (req, res) {
    let count = await greet.count()
    let message = await greet.greetedUser()
    res.render('home', {
      count,
      message

    })
  }

  async function usesGreeted (req, res) {
    try {
      let username = req.params.user_name
      let results = await greet.ReadUser(username)
      res.render('namesGreeted', {
        time: results
      })
    } catch (err) {
      res.send(err.stack)
    }
  }
  async function greetingF (req, res) {
    try {
      const language = req.body.language
      const name = req.body.name

      if (name === '' && language === undefined) {
        req.flash('info', 'Please Enter Name & Select Language')
      } else if (name === '') {
        req.flash('info', 'Please Enter a Name')
      } else if (language === undefined) {
        req.flash('info', 'Please Select Language')
      }

      let greetings = {
        message: await greet.greetFunction(language, name),
        count: await greet.greetsCounted()
      }

      res.render('home', {
        greetings
      })
    } catch (err) {

    }
  }

  async function home (req, res) {
    let greetings = {
      // message: await greet.greetFunction(language, name),
      count: await greet.greetsCounted()
    }
    res.render('home', {
      greetings
    })
  }

  async function resetDb (req, res) {
    let deleteUsers = await greet.resetBtn()

    res.render('greeted', {
      deleteUsers
    })
  }

  async function reset (req, res) {
    let deleteUsers = await greet.resetBtn()

    res.render('home', {
      deleteUsers
    })
  }

  async function greeted (req, res) {
    try {
      let greetedUser = await greet.greetedUser()

      let counter = await greet.countLocal()

      res.render('greeted', {
        greetedUser,
        counter
      })
    } catch (err) {}
  }

  return {
    homeRoute,
    usesGreeted,
    greetingF,
    home,
    resetDb,
    reset,
    greeted

  }
}
