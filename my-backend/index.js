const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',  // or your DB host
  user: 'root',
  password: '???',
  database: 'testdb'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

app.get('/nordiska-brand-data', (req, res) => {
  const sql = `
    SELECT 'entreprenad' AS category, idproject, data FROM entr
    UNION ALL
    SELECT 'VattenKälla', idproject, data FROM kalla
    UNION ALL
    SELECT 'Skede', idproject, data FROM skede
    UNION ALL
    SELECT 'System', idproject, data FROM syst
    UNION ALL
    SELECT 'Typ', idproject, data FROM typ
    UNION ALL
    SELECT 'Regelverk', idproject, data FROM verk;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});






const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
