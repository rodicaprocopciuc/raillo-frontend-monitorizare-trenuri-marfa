import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetaliiVagon.css';
import vagoaneData from '../data/vagoaneData';

const DetaliiVagon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabActiv, setTabActiv] = useState('informatii');
  const [vagon, setVagon] = useState(vagoaneData[id]); 

  if (!vagon) {
    return <div>Vagonul nu a fost găsit.</div>;
  }

  
  const handleEditare = () => {
    const nouTip = prompt("Introdu un nou tip pentru vagon:", vagon.tip);
    if (nouTip) {
      setVagon(prev => ({ ...prev, tip: nouTip }));
      alert(`Tipul vagonului a fost actualizat la: ${nouTip}`);
    }
  };

  const handlePlanificaRevizie = () => {
    const nouaData = prompt("Introdu noua dată pentru următoarea revizie (ex: 15/05/2025):", vagon.urmatoareaRevizie);
    if (nouaData) {
      setVagon(prev => ({ ...prev, urmatoareaRevizie: nouaData }));
      alert(`Următoarea revizie a fost actualizată la: ${nouaData}`);
    }
  };

  const handleMarcheazaDefect = () => {
    const confirmare = window.confirm("Ești sigur că vrei să marchezi vagonul ca DEFECT?");
    if (confirmare) {
      setVagon(prev => ({ ...prev, stare: 'Defect' }));
      alert("Vagonul a fost marcat ca DEFECT!");
    }
  };

  return (
    <div className="detalii-vagon-container">
      {/* Înapoi */}
      <div className="inapoi-container">
        <button className="inapoi-button" onClick={() => navigate(-1)}>← Înapoi</button>
      </div>

      <h2 className="titlu">Detalii vagon</h2>

      {/* Imagine */}
      {vagon.imagine && (
        <div className="vagon-image-container">
          <img src={vagon.imagine} alt={`Vagon ${vagon.tip}`} className="vagon-image" />
        </div>
      )}

      {/* Taburi */}
      <div className="tab-buttons">
        <button className={tabActiv === 'informatii' ? 'active' : ''} onClick={() => setTabActiv('informatii')}>Informații generale</button>
        <button className={tabActiv === 'date' ? 'active' : ''} onClick={() => setTabActiv('date')}>Date tehnice</button>
        <button className={tabActiv === 'stare' ? 'active' : ''} onClick={() => setTabActiv('stare')}>Stare tehnică</button>
        <button className={tabActiv === 'observatii' ? 'active' : ''} onClick={() => setTabActiv('observatii')}>Observații</button>
      </div>

      {/* Conținut taburi */}
      <div className="tab-content">
        {tabActiv === 'informatii' && (
          <div className="card">
            <p><strong>ID Vagon:</strong> {id}</p>
            <p><strong>Tip:</strong> {vagon.tip}</p>
            <p><strong>Stare curentă:</strong> 
              <span className={`badge ${vagon.stare === 'Disponibil' ? 'disponibil' : 'utilizare'}`}>
                {vagon.stare}
              </span>
            </p>
          </div>
        )}

        {tabActiv === 'date' && (
          <div className="card">
            <p><strong>An fabricație:</strong> {vagon.anFabricatie}</p>
            <p><strong>Greutate proprie:</strong> {vagon.greutate}</p>
            <p><strong>Număr axe:</strong> {vagon.numarAxe}</p>
            <p><strong>Ultima revizie:</strong> {vagon.ultimaRevizie}</p>
            <p><strong>Următoarea revizie:</strong> {vagon.urmatoareaRevizie}</p>
          </div>
        )}

        {tabActiv === 'stare' && (
          <div className="card">
            <p><strong>Frâne:</strong> {vagon.frane}</p>
            <p><strong>Sisteme electrice:</strong> {vagon.sistemeElectrice}</p>
            <p><strong>Caroserie:</strong> {vagon.caroserie}</p>
            <p><strong>Roți:</strong> {vagon.roti}</p>
          </div>
        )}

        {tabActiv === 'observatii' && (
          <div className="card">
            <p><strong>Observații suplimentare:</strong> {vagon.observatii}</p>
          </div>
        )}
      </div>

      {/* Butoane acțiuni */}
      <div className="action-buttons">
        <button onClick={handleEditare}>Editare date vagon</button>
        <button onClick={handlePlanificaRevizie}>Planifică revizie nouă</button>
        <button onClick={handleMarcheazaDefect}>Marchează ca defect</button>
      </div>
    </div>
  );
};

export default DetaliiVagon;
