import React, { useState } from 'react';
import './AdaugaAlerta.css';
import { useNavigate } from 'react-router-dom';

function AdaugaAlerta() {
  const navigate = useNavigate();

  const trenuri = [101, 102, 103, 104, 105];
  const [tren, setTren] = useState('');
  const [tip, setTip] = useState('');
  const [locatie, setLocatie] = useState('');
  const [severitate, setSeveritate] = useState('Mediu');
  const [status, setStatus] = useState('Nerezolvat');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const alertaNoua = {
      tren: parseInt(tren),
      tip,
      locatie,
      severitate,
      status,
      data,
      coord: [46, 24]
    };

    const alerteExistente = JSON.parse(localStorage.getItem('alerteRailLo')) || [];
    alerteExistente.push(alertaNoua);
    localStorage.setItem('alerteRailLo', JSON.stringify(alerteExistente));

    navigate('/alerte');
  };

  return (
    <div className="pagina-alerta">
      {/*  Butonul în afara containerului */}
      <button className="btn-inapoi-fix" onClick={() => navigate(-1)}>
        ← Înapoi
      </button>

      <div className="adauga-alerta-container">
        <h2>Adaugă alertă manual</h2>
        <form onSubmit={handleSubmit}>
          <label>ID Tren:</label>
          <select value={tren} onChange={(e) => setTren(e.target.value)} required>
            <option value="">Selectează tren</option>
            {trenuri.map((id) => (
              <option key={id} value={id}>Tren {id}</option>
            ))}
          </select>

          <input type="text" placeholder="Tip pericol" value={tip} onChange={(e) => setTip(e.target.value)} required />
          <input type="text" placeholder="Locație" value={locatie} onChange={(e) => setLocatie(e.target.value)} required />

          <label>Severitate:</label>
          <select value={severitate} onChange={(e) => setSeveritate(e.target.value)}>
            <option value="Scăzută">Scăzută</option>
            <option value="Mediu">Mediu</option>
            <option value="Ridicată">Ridicată</option>
          </select>

          <label>Data/Ora:</label>
          <input type="datetime-local" value={data} onChange={(e) => setData(e.target.value)} required />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Nerezolvat">Nerezolvat</option>
            <option value="in curs">în curs</option>
            <option value="Rezolvat">Rezolvat</option>
          </select>

          <button type="submit">Salvează alerta</button>
        </form>
      </div>
    </div>
  );
}

export default AdaugaAlerta;
