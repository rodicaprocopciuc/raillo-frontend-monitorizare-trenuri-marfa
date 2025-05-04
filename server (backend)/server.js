const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectare la baza de date PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'rodica',
  database: 'RailLo'
});

client.connect()
  .then(() => console.log('Conectat la baza de date PostgreSQL!'))
  .catch(err => console.error('Eroare la conectare:', err.stack));

// Middleware pentru autentificare (verificarea tokenului JWT)
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // format: "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Token lipsă.' });

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalid.' });
    req.user = decoded;
    next();
  });
};

// Ruta de înregistrare
app.post('/api/register', async (req, res) => {
  const { nume, email, parola, rol } = req.body;

  try {
    const existing = await client.query('SELECT * FROM utilizatori WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Emailul este deja folosit.' });
    }

    const hashedPassword = await bcrypt.hash(parola, 10);
    await client.query(
      'INSERT INTO utilizatori (nume, email, parola, rol) VALUES ($1, $2, $3, $4)',
      [nume, email, hashedPassword, rol]
    );

    res.status(201).json({ message: 'Cont creat cu succes.' });
  } catch (error) {
    console.error('Eroare la înregistrare:', error.stack);
    res.status(500).json({ message: 'Eroare la înregistrare.' });
  }
});

// Ruta de autentificare (login)
app.post('/api/login', async (req, res) => {
  const { email, parola } = req.body;

  try {
    const result = await client.query('SELECT * FROM utilizatori WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email sau parolă incorecte.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(parola, user.parola);
    if (!match) {
      return res.status(401).json({ message: 'Email sau parolă incorecte.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol, nume: user.nume },
      'secretkey',
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Eroare la autentificare:', error.stack);
    res.status(500).json({ message: 'Eroare la autentificare.' });
  }
});

// Ruta pentru obținerea profilului
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const result = await client.query(
      'SELECT id, nume, email, rol FROM utilizatori WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Eroare la obținerea profilului:', error.stack);
    res.status(500).json({ message: 'Eroare la server.' });
  }
});

// Pornește serverul
app.listen(3000, () => {
  console.log('✅ Serverul rulează pe http://localhost:3000');
});
