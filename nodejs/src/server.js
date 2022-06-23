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

const pool = mysql.createPool(config);

//Create table
pool.query(`CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));`, function (err) {
  if (err) throw err;

  //Insert DB
  pool.query(`INSERT INTO people(name) VALUES (CONCAT('Rafa - ', NOW()));`, function (err) {
    if (err) throw err;
  });
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