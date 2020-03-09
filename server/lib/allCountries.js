const agent = require('superagent')

function getAllCountries() {
  return agent
    .get('https://restcountries.eu/rest/v2/all')    
    .then(res => res.body.map(item => item.name))    
}

module.exports = getAllCountries