const express = require('express')
const fs = require('fs')
const path = require('path')
const hbs = require('hbs')

const app = express()

app.set({'view engine': 'hbs'})

// app.use((req, res, next) =>
//   res.render('maintanence.hbs')
// )

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} : ${req.path}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err)
    }
  })
  next()
})

app.use(express.static(path.join(__dirname, '/public')))

hbs.registerPartials(path.join(__dirname, 'views/partials'))

hbs.registerHelper('getCurrentYear', () => (new Date()).getFullYear())

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'})
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {'pageTitle': 'About Page'})
})

app.get('/bad', (req, res) => {
  res.send({
    msg: 'Unable to handle request'
  })
})

app.listen(3000, () => {
  console.log('server is running')
})
