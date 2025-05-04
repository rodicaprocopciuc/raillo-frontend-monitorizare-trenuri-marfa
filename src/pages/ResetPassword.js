// ResetPassword.js
import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
 
    setSent(true);
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-box">
          <h1>Resetare parolă</h1>
          {sent ? (
            <p className="confirmation-text">
              Un link de resetare a fost trimis la <b>{email}</b>.
            </p>
          ) : (
            <form onSubmit={handleReset}>
              <input
                type="email"
                placeholder="Adresă de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Trimite linkul de resetare</button>
            </form>
          )}
          <p className="signup-text">
            Îți amintești parola? <Link to="/login">Autentificare</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
