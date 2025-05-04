import React, { useState } from 'react';
import './Utilizatori.css';

const Utilizatori = () => {
  const currentUserRole = 'Admin'; 

  const [utilizatori, setUtilizatori] = useState([
    { id: 1, nume: 'Mihai Popescu', email: 'mihai.popescu@gmail.com', rol: 'Dispecer' },
    { id: 2, nume: 'Elena Ionescu', email: 'elena.ionescu@gmail.com', rol: 'Tehnician' },
    { id: 3, nume: 'Ion Marin', email: 'ion.marin@gmail.com', rol: 'Manager' },
    { id: 4, nume: 'Marla Constantinescu', email: 'maria.constantinescu@gmail.com', rol: 'Admin' },
  ]);

  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const adaugaUtilizator = () => {
    const nouUtilizator = {
      id: utilizatori.length + 1,
      nume,
      email,
      rol,
    };
    setUtilizatori([...utilizatori, nouUtilizator]);
    resetForm();
  };

  const editeazaUtilizator = (id) => {
    const utilizatorDeEditat = utilizatori.find((utilizator) => utilizator.id === id);
    setNume(utilizatorDeEditat.nume);
    setEmail(utilizatorDeEditat.email);
    setRol(utilizatorDeEditat.rol);
    setEditMode(true);
    setEditId(id);
  };

  const salveazaEditare = () => {
    const utilizatoriActualizati = utilizatori.map((utilizator) =>
      utilizator.id === editId ? { ...utilizator, nume, email, rol } : utilizator
    );
    setUtilizatori(utilizatoriActualizati);
    resetForm();
  };

  const stergeUtilizator = (id) => {
    const utilizatoriRamasi = utilizatori.filter((utilizator) => utilizator.id !== id);
    setUtilizatori(utilizatoriRamasi);
  };

  const resetForm = () => {
    setNume('');
    setEmail('');
    setRol('');
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="utilizatori-container">
      <h2 className="utilizatori-title">Utilizatori</h2>

      {currentUserRole === 'Admin' && (
        <div className="utilizatori-actions">
          <h3>{editMode ? 'Editează Utilizator' : 'Adaugă Utilizator'}</h3>
          <form onSubmit={editMode ? (e) => { e.preventDefault(); salveazaEditare(); } : (e) => { e.preventDefault(); adaugaUtilizator(); }}>
            <label>Nume:</label>
            <input
              type="text"
              value={nume}
              onChange={(e) => setNume(e.target.value)}
              placeholder="Nume complet"
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
            <label>Rol:</label>
            <input
              type="text"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              placeholder="Rol utilizator"
              required
            />
            <button type="submit">{editMode ? 'Salvează' : 'Adaugă'}</button>
          </form>
        </div>
      )}

      <table className="utilizatori-table">
        <thead>
          <tr>
            <th>Nume</th>
            <th>Email</th>
            <th>Rol</th>
            {currentUserRole === 'Admin' && <th>Acțiuni</th>}
          </tr>
        </thead>
        <tbody>
          {utilizatori.map((utilizator) => (
            <tr key={utilizator.id}>
              <td>{utilizator.nume}</td>
              <td>{utilizator.email}</td>
              <td>{utilizator.rol}</td>
              {currentUserRole === 'Admin' && (
                <td>
                  <button onClick={() => editeazaUtilizator(utilizator.id)}>Editează</button>
                  <button onClick={() => stergeUtilizator(utilizator.id)}>Șterge</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Utilizatori;
