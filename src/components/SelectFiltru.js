

import React from 'react';

const SelectFiltru = ({ filtru, setFiltru }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ fontWeight: 'bold', marginRight: '10px' }}>
        Filtrează după stare:
      </label>
      <select value={filtru} onChange={(e) => setFiltru(e.target.value)}>
        <option value="toate">Toate</option>
        <option value="laTimp">La timp</option>
        <option value="intarziat">Întârziat</option>
        <option value="intarziereMica">Întârziere mică</option>
        <option value="intarziereMare">Întârziere mare</option>
        <option value="planificat">Planificat</option>
      </select>
    </div>
  );
};

export default SelectFiltru;
