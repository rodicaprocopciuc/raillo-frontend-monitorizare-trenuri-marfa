import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import HartaTrenuri from '../components/HartaTrenuri';

function Home() {
  const navigate = useNavigate();

  const handleNavigateToMap = () => {
    navigate('/harta');
  };

  return (
    <>
      <h2 className="dashboard-title">Bine ai revenit!</h2>

      <div className="stats">
        <div className="stat-card">
          <h3 className="green">5</h3>
          <p>Trenuri active</p>
        </div>
        <div className="stat-card">
          <h3 className="red">1</h3>
          <p>Trenuri întârziate</p>
        </div>
        <div className="stat-card">
          <h3 className="blue">8</h3>
          <p>Vagoane în circulație</p>
        </div>
      </div>

      <div className="map-card">
        <div className="map-header">
          <h3>Mini-hartă trasee</h3>
          <button className="map-link" onClick={handleNavigateToMap}>
            Extinde harta →
          </button>
        </div>
        <div className="mini-map-wrapper">
          <HartaTrenuri miniMode={true} filtru="toate" />
        </div>
      </div>
    </>
  );
}

export default Home;
