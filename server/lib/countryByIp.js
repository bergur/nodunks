const agent = require('superagent')
const logger = require('heroku-logger')

function getCountryByIp(ip) {
  return agent
    .get('https://spott.p.rapidapi.com/places/ip/' + ip)    
    .set('x-rapidapi-host', process.env.SPOTT_API_HOST)
    .set('x-rapidapi-key', process.env.SPOTT_API_KEY)
    .then(res => res.body.country.name)
    .catch(e =>  {
      logger.error(e)
      return undefined
    })
}

module.exports = getCountryByIp
