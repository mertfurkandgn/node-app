const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL bağlantı yapılandırması
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'u859300455_admin',
  password: 'yourPassword', // Şifre varsa buraya ekleyin
  database: 'u859300455_db'
});

// MySQL'e bağlanma
connection.connect((err) => {
  if (err) {
    console.error('MySQL bağlantı hatası: ' + err.stack);
    return;
  }
  console.log('MySQL bağlantısı başarılı...');
});

// Kullanıcıyı veritabanına ekleme
app.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  const query = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, surname, email, password], (err, result) => {
    if (err) {
      console.error('Veritabanı sorgu hatası:', err);
      res.status(500).send('Sunucu hatası');
    } else {
      res.status(200).send('Kullanıcı kayıt edildi');
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
