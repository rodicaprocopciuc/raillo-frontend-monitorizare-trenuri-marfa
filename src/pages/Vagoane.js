import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vagoane.css';

const Vagoane = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [vagoane] = useState([
    { id: 1, tip: 'Acoperit', capacitate: '60 t', stare: 'Disponibil' },
    { id: 2, tip: 'Platformă', capacitate: '50 t', stare: 'În utilizare' },
    { id: 3, tip: 'Cisternă', capacitate: '80 t', stare: 'În utilizare' },
    { id: 4, tip: 'Platformă', capacitate: '45 t', stare: 'Disponibil' },
    { id: 5, tip: 'Acoperit', capacitate: '58 t', stare: 'Disponibil' },
  ]);

  const vagoaneFiltered = vagoane.filter((vagon) =>
    vagon.tip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vagon.capacitate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vagon.stare.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetaliiClick = (id) => {
    navigate(`/vagon/${id}`);
  };

  return (
    <div className="vagoane-container">
      <div className="vagoane-header">
        <h2>Vagoane</h2>
        <div className="vagoane-actions">
          <input
            type="text"
            placeholder="Căutare rapidă"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Asociază</button>
        </div>
      </div>

      <table className="vagoane-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tip</th>
            <th>Capacitate</th>
            <th>Stare</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {vagoaneFiltered.map((vagon) => (
            <tr key={vagon.id}>
              <td>{vagon.id}</td>
              <td>{vagon.tip}</td>
              <td>{vagon.capacitate}</td>
              <td>{vagon.stare}</td>
              <td>
                <button onClick={() => handleDetaliiClick(vagon.id)}>Detalii</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vagoane;
