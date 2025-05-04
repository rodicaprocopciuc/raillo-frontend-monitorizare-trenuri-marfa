import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-row top">
        <p>© 2025 RailLo – Toate drepturile rezervate</p>
      </div>
      <div className="footer-row bottom">
        <div className="footer-links">
          <a href="/contact">Contact</a>
          <a href="/termeni">Termeni</a>
          <a href="/politica">Politică</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
