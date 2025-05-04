const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

exports.register = async (req, res) => {
  const { nume, email, parola, rol } = req.body;
  try {
    const existing = await db.query('SELECT * FROM utilizatori WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Emailul este deja înregistrat.' });
    }

    const hashedPassword = await bcrypt.hash(parola, 10);
    await db.query(
      'INSERT INTO utilizatori (nume, email, parola, rol) VALUES ($1, $2, $3, $4)',
      [nume, email, hashedPassword, rol]
    );

    res.status(201).json({ message: 'Cont creat cu succes.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la înregistrare.' });
  }
};

exports.login = async (req, res) => {
  const { email, parola } = req.body;
  try {
    const result = await db.query('SELECT * FROM utilizatori WHERE email = $1', [email]);
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Eroare la autentificare.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nume, email, rol FROM utilizatori WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Eroare la obținerea profilului.' });
  }
};
