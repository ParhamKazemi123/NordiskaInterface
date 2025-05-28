const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!!',
  database: 'testdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/project', (req, res) => {
  const name = req.query.name;

  const query = name
    ? 'SELECT * FROM projects WHERE name LIKE ?'
    : 'SELECT * FROM projects';

  const values = name ? [`%${name}%`] : [];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


app.get('/verk', (req, res) => {
  db.query('SELECT * FROM verk', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
