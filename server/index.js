require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const requestIp = require('request-ip')

const getCountryByIp = require('./lib/countryByIp')
const getAllCountries = require('./lib/allCountries')
const insert = require('./lib/insert')

const app = express()

app.use(bodyParser.json())
app.use('/', express.static('dist'))

app.get('/ip', (req, res, next) => {
  const ip = requestIp.getClientIp(req)
  // const ip = '200.194.51.97'
  return getCountryByIp(ip)
    .then(country => {
      res.json({ ip, country })
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

app.listen(process.env.PORT || 3000)
