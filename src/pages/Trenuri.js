import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Trenuri.css';

const Trenuri = () => {
  const [trenuri] = useState([
    { id: 101, ruta: 'București–Brașov', stare: 'în circulație', oraPlecare: '10:00–17:00', oraSosire: '16:00' },
    { id: 102, ruta: 'Constanța–Oradea', stare: 'Planificat', oraPlecare: '18:00–20:15', oraSosire: '17:00' },
    { id: 103, ruta: 'Timișoara–Iași', stare: 'Întârziat', oraPlecare: '18:10–22:15', oraSosire: '18:30' },
    { id: 104, ruta: 'Brașov–Cluj-Napoca', stare: 'în circulație', oraPlecare: '17:30–22:45', oraSosire: '20:45' },
    { id: 105, ruta: 'Sibiu–Târgu Mureș', stare: 'Planificat', oraPlecare: '10:30–12:30', oraSosire: '17:30' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const trenuriFiltered = trenuri.filter((tren) =>
    tren.ruta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleNavigateToMap = (id) => {
    navigate(`/harta/${id}`);
  };

  return (
    <div className="trenuri-container">
      <div className="trenuri-header">
        <h2>Trenuri</h2>
        <div className="trenuri-actions">
          <input
            type="text"
            placeholder="Căutare rapidă"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="trenuri-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Rută</th>
            <th>Stare</th>
            <th>Ora plecare</th>
            <th>Ora sosire</th>
            <th>Harta</th>
          </tr>
        </thead>
        <tbody>
          {trenuriFiltered.map((tren) => (
            <tr key={tren.id}>
              <td>{tren.id}</td>
              <td>{tren.ruta}</td>
              <td>{tren.stare}</td>
              <td>{tren.oraPlecare}</td>
              <td>{tren.oraSosire}</td>
              <td>
                <button onClick={() => handleNavigateToMap(tren.id)}>Harta</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trenuri;
