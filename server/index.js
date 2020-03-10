require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const requestIp = require('request-ip')

const getCountryByIp = require('./lib/countryByIp')
const getAllCountries = require('./lib/allCountries')
const insert = require('./lib/insert')
const select = require('./lib/select')
const listenersPerCountry = require('./lib/listenersPerCountry')

const app = express()

app.use(bodyParser.json())
app.use('/', express.static('dist'))

// app.use(requestIp.mw())
app.use((req, res, next) => {
  req.clientIp = '200.194.51.97'
  next()
})

app.get('/ip', (req, res, next) => {
  return getCountryByIp(req.clientIp)
    .then(country => {
      res.json({ 
        ip: req.clientIp,
        country
      })
    })
    .catch(next)
})

app.get('/countries', (req, res, next) => {  
  return getAllCountries()
    .then(country => {
      res.json(country)
    })
    .catch(next)
})

app.post('/submit', (req, res, next) => {
  return insert(req.body)
    .then(id => {
      res.json({ id })
    })
    .catch(next)
})

app.get('/submitted', (req, res, next) => {
  return select(req.clientIp)
    .then(submitted => {
      res.json({ submitted })
    })
    .catch(next)
})

app.get('/listenerspercountry', (req, res, next) => {
  return listenersPerCountry()
    .then(data => {
      res.json(data)
    })
    .catch(next)
})


app.listen(process.env.PORT || 3000)
