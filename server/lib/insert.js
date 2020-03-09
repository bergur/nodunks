const db = require('../db')

function insert(obj) {  
  const sql = `
    INSERT INTO fansurvey (
      ip,
      country,
      quiz
    )
    VALUES ($1, $2, $3)
    RETURNING id`
  
  const params = [
    obj.ip,
    obj.country,
    obj.quiz.join(';')
  ]
    
  return db
    .query(sql, params)
    .then(res => res.rows[0].id)
}

module.exports = insert