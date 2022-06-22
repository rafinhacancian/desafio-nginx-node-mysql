const express = require('express');
const mysql = require('mysql');

const app = express()
const port = 3000

//Config DB
const config = {
  host: "mysql",
  user: "root",
  password: "root",
  database: "nodedb"
}

//Insert DB
const pool = mysql.createPool(config);
pool.query(`INSERT INTO people(name) VALUES (CONCAT('Rafa - ', NOW()));`, function (err) {
  if (err) throw err;
});

//Get all names
app.get('/', (req, res) => {
  const pool = mysql.createPool(config);
  pool.query(`SELECT name FROM people`, function (err, result) {
    if (err) throw err;
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${result.map(item => `<li>${item.name}</li>`).join('')}
      </ul>`);
  });
});

//Server listening 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});