const db = require('../db')

function select (ip) {
  const sql = `
    SELECT
      id
    FROM
      fansurvey
    WHERE
      ip = $1`
  
  const params = [ip]

  return db
    .query(sql, params)
    .then(res => res.rows.length > 0)
}

module.exports = select