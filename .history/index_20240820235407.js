const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'u859300455_admin',
  password: 'Mert.ksk123', // Add password if required
  database: 'u859300455_db'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('MySQL Connected...');
});

// Kullanıcıyı veritabanına ekleme
app.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  const query = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, surname, email, password], (err, result) => {
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
