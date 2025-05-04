import React from 'react';

function Legend() {
  return (
    <div style={{
      background: 'white',
      padding: '10px',
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      zIndex: 1000,
      borderRadius: '8px',
      boxShadow: '0 0 5px rgba(0,0,0,0.3)'
    }}>
      <p><span style={{ color: 'green' }}>●</span> La timp</p>
      <p><span style={{ color: 'orange' }}>●</span> Întârziere mică</p>
      <p><span style={{ color: 'red' }}>●</span> Întârziere mare</p>
    </div>
  );
}

export default Legend;
