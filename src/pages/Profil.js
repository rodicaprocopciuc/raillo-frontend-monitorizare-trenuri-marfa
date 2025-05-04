import React from 'react';
import './Profil.css'; 

function Profil() {
  return (
    <div className="profil-page">
      <div className="profil-card">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
          alt="User" 
          className="profil-avatar"
        />
        <h2>Marla Constantinescu</h2>
        <p>Email: maria.constantinescu@gmail.com</p>
        <p>Rol: Administrator</p>
        <button className="profil-button">Editează Profil</button>
      </div>
    </div>
  );
}

export default Profil;
