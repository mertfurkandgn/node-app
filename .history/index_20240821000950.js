const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL bağlantı yapılandırması
let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'u859300455_admin',
    password: 'yourPassword', // Şifre varsa buraya ekleyin
    database: 'u859300455_db'
  });

  connection.connect((err) => {
    if (err) {
      console.error('MySQL bağlantı hatası: ' + err.stack);
      setTimeout(handleDisconnect, 2000); // Bağlantı hatası durumunda 2 saniye bekle ve tekrar dene
    } else {
      console.log('MySQL bağlantısı başarılı...');
    }
  });

  connection.on('error', (err) => {
    console.error('MySQL bağlantı hatası: ' + err.stack);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Bağlantı kaybolduysa yeniden başlat
    } else {
      throw err;
    }
  });
}

handleDisconnect();

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
