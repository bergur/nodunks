const agent = require('superagent')

function getAllCountries() {
  return agent
    .get('https://restcountries.eu/rest/v2/all')    
    .then(res => res.body.map(item => {
      return  {
        name: item.name,
        population: item.population
      }
    }))
         
}

module.exports = getAllCountries