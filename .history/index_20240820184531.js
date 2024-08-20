const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Kullanıcıyı veritabanına ekleme
app.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  const query = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [name, surname, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('User registered');
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
