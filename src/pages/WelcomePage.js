import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import hartaImg from '../imagini/harta.png';
import trenImg from '../imagini/tren.png';
import vagonImg from '../imagini/vagon.png';
import raportImg from '../imagini/raport.png';
import lacatImg from '../imagini/lacat.png';  

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      {/* Butonul Home în colțul din dreapta sus */}
      <div className="home-button-container">
        <Link to="/home">
          <button className="home-button">Home</button>
        </Link>
      </div>

      <div className="welcome-header">
        <h1>RailLo</h1>
        <p>Sistem digital de monitorizare marfă</p>
        <p>Această platformă este dedicată operatorilor feroviar de marfă. Prin autentificare, vei putea vizualiza trenurile active, compoziția vagoanelor, harta rutelor și rapoarte logistice personalizate.</p>
      </div>
      
      <div className="welcome-image">
        <img src={hartaImg} alt="Harta Trenuri" className="image" />
      </div>
      
      <div className="features">
        <div className="feature">
          <img src={trenImg} alt="Monitorizează trenurile" className="icon" />
          <p>Monitorizezi trenurile în timp real</p>
        </div>
        <div className="feature">
          <img src={raportImg} alt="Generezi rapoarte" className="icon" />
          <p>Generezi rapoarte automatizate</p>
        </div>
        <div className="feature">
          <img src={vagonImg} alt="Urmărești vagoanele" className="icon" />
          <p>Urmărești marfa și starea vagoanelor</p>
        </div>
        <div className="feature">
          <img src={lacatImg} alt="Acces securizat" className="icon" />
          <p>Access securizat, roluri definite</p>
        </div>
      </div>

      <Link to="/autentificare">
        <button className="auth-button">Autentificare</button>
      </Link>

      
    </div>
  );
};

export default WelcomePage;
