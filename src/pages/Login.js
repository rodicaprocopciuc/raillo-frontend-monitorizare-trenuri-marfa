// src/pages/Login.js
import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [eroare, setEroare] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, parola })
      });
      const data = await response.json();
      if (!response.ok) {
        setEroare(data.message || 'Eroare la autentificare.');
        return;
      }
      localStorage.setItem('tokenRailLo', data.token);
      navigate('/profil');
    } catch (error) {
      setEroare('Eroare la conectarea cu serverul.');
    }
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-box">
          <h1>Autentificare</h1>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Adresă de e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Parolă" value={parola} onChange={(e) => setParola(e.target.value)} required />
            <button type="submit">Autentificare</button>
          </form>
          {eroare && <p className="eroare-text">{eroare}</p>}
          <div className="forgot-password">
            <Link to="/resetare-parola">Ai uitat parola?</Link>
          </div>
          <p className="signup-text">Nu aveți cont? <Link to="/inregistrare">Înregistrare</Link></p>
        </div>
      </main>
    </div>
  );
}

export default Login;
