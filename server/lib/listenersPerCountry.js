const db = require('../db')

function listenersPerCountry () {
  const sql = `
    SELECT
      COUNT(id),
      country
    FROM
      fansurvey
    GROUP BY
      country`

  const params = []
  
  return db
    .query(sql, params)
    .then(res => res.rows.map(item => [item.country, Number(item.count)]))
  }

module.exports = listenersPerCountry