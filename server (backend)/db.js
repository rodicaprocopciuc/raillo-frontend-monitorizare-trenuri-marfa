// db.js
const { Client } = require('pg');

const client = new Client({
  user: 'postgres', // Utilizatorul
  host: 'localhost', // Gazda
  database: 'RailLo', // Numele bazei de date
  password: 'rodica', // Parola pentru utilizatorul respectiv
  port: 5432, // Portul implicit
});

client.connect() // Conectează-te la baza de date
  .then(() => console.log("Conectat la baza de date PostgreSQL!"))
  .catch((err) => console.error("Eroare la conectarea la baza de date:", err.stack));

module.exports = client;
