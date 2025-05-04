import React, { useState } from 'react';
import './Inregistrare.css';
import { useNavigate } from 'react-router-dom';

const Inregistrare = () => {
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [confirmaParola, setConfirmaParola] = useState('');
  const [rol, setRol] = useState('');
  const [eroare, setEroare] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nume || !email || !parola || !confirmaParola || !rol) {
      setEroare('Toate câmpurile sunt obligatorii.');
      return;
    }

    if (parola !== confirmaParola) {
      setEroare('Parolele nu coincid.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nume, email, parola, rol })
      });

      const data = await response.json();

      if (!response.ok) {
        setEroare(data.message || 'Eroare la înregistrare.');
        return;
      }

      alert('Cont creat cu succes!');
      navigate('/autentificare');
    } catch (error) {
      setEroare('Eroare la conectarea cu serverul.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Înregistrare</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nume complet" value={nume} onChange={(e) => setNume(e.target.value)} required />
          <input type="email" placeholder="Adresă de e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Parolă" value={parola} onChange={(e) => setParola(e.target.value)} required />
          <input type="password" placeholder="Confirmă parola" value={confirmaParola} onChange={(e) => setConfirmaParola(e.target.value)} required />
          <select value={rol} onChange={(e) => setRol(e.target.value)} required className="select-input">
            <option value="">Selectează rolul</option>
            <option value="dispecer">Dispecer</option>
            <option value="tehnician">Tehnician</option>
            <option value="manager">Manager</option>
          </select>
          <button type="submit">Înregistrează-te</button>
        </form>
        {eroare && <p className="eroare-text">{eroare}</p>}
        <div className="signin-link">
          <p>Ai deja cont? <a href="/autentificare">Autentificare</a></p>
        </div>
      </div>
    </div>
  );
};

export default Inregistrare;
