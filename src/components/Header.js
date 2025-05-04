import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../imagini/logo.png';
import userIcon from '../imagini/user.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const noAccountPages = ['/autentificare', '/inregistrare', '/', '/resetare-parola'];
  const hideUserControls = noAccountPages.includes(location.pathname);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Ești sigur că vrei să te deloghezi?");
    if (confirmLogout) {
      alert("Te-ai delogat!");
      navigate('/autentificare');
    }
  };

  const navigateToProfile = () => {
    navigate('/profil');
  };

  return (
    <header className="header-container">
      <div className="logo-container" onClick={() => navigate('/home')}>
        <img src={logo} alt="Logo RailLo" className="logo" />
        <span>RailLo - Monitorizare trenuri de marfă</span>
      </div>

      {!hideUserControls && (
        <div className="user-container">
          <img 
            src={userIcon} 
            alt="User Icon" 
            className="user-icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="user-button"
          >
            Contul meu
          </button>

          {isMenuOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={navigateToProfile}>
                Profilul meu
              </div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                Delogare
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
