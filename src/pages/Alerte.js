import './Alerte.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';

import iconRosu from '../imagini/alertarosie.png';
import iconGalben from '../imagini/alertagalbena.png';
import iconVerde from '../imagini/alertaverde.png';

const LOC_COORDS = {
  "Arad": [46.1833, 21.3167],
  "Ploiești": [44.9429, 26.0361],
  "Turda": [46.5667, 23.7833],
  "Timișoara Nord": [45.755, 21.225],
  "Iași": [47.1622, 27.5889],
  "Cluj-Napoca": [46.7712, 23.6236],
  "Brașov": [45.6556, 25.6106],
  "Constanța": [44.1598, 28.6348],
  "București": [44.4268, 26.1025]
};

function Alerte() {
  const [alerte, setAlerte] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    tren: '',
    tip: '',
    locatie: '',
    severitate: 'Mediu',
    status: 'Nerezolvat',
    data: '',
  });

  const [filtruTip, setFiltruTip] = useState('');
  const [filtruLocatie, setFiltruLocatie] = useState('');

  useEffect(() => {
    const alerteLocale = JSON.parse(localStorage.getItem('alerteRailLo')) || [];

    if (alerteLocale.length === 0) {
      const alertePredefinite = [
        {
          tren: 101,
          tip: 'Defecțiune șină',
          locatie: 'Arad',
          severitate: 'Ridicată',
          data: '2025-04-29T14:30',
          status: 'Nerezolvat'
        },
        {
          tren: 102,
          tip: 'Probleme frână',
          locatie: 'Ploiești',
          severitate: 'Mediu',
          data: '2025-04-28T18:45',
          status: 'in curs'
        }
      ];

      const completate = alertePredefinite.map(a => ({
        ...a,
        coord: LOC_COORDS[a.locatie] || [45.9432, 24.9668]
      }));

      localStorage.setItem('alerteRailLo', JSON.stringify(completate));
      setAlerte(completate);
    } else {
      const completate = alerteLocale.map(a => ({
        ...a,
        coord: LOC_COORDS[a.locatie] || [45.9432, 24.9668]
      }));
      setAlerte(completate);
    }
  }, []);

  const getMarkerIcon = (status) => {
    const iconImg =
      status === 'Nerezolvat' ? iconRosu :
      status === 'in curs' ? iconGalben :
      iconVerde;

    return L.icon({
      iconUrl: iconImg,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30],
    });
  };

  const handleDelete = (index) => {
    if (window.confirm('Ești sigur că vrei să ștergi această alertă?')) {
      const updated = [...alerte];
      updated.splice(index, 1);
      setAlerte(updated);
      localStorage.setItem('alerteRailLo', JSON.stringify(updated));
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData({ ...alerte[index] });
  };

  const handleSaveEdit = () => {
    const updated = [...alerte];
    updated[editIndex] = {
      ...editData,
      coord: LOC_COORDS[editData.locatie] || [45.9432, 24.9668]
    };
    setAlerte(updated);
    setEditIndex(null);
    localStorage.setItem('alerteRailLo', JSON.stringify(updated));
  };

  const alerteFiltrate = alerte.filter((a) => {
    const tipOk = filtruTip === '' || a.tip === filtruTip;
    const locOk = filtruLocatie === '' || a.locatie === filtruLocatie;
    return tipOk && locOk;
  });

  const optiuniTip = [...new Set(alerte.map(a => a.tip))];
  const optiuniLocatie = [...new Set(alerte.map(a => a.locatie))];

  return (
    <div className="alerte-container">
      <h1>Alerte și Pericole întâlnite pe trasee</h1>

      <div className="filtru-bar">
        <select value={filtruTip} onChange={(e) => setFiltruTip(e.target.value)}>
          <option value="">Toate tipurile</option>
          {optiuniTip.map((tip, i) => (
            <option key={i} value={tip}>{tip}</option>
          ))}
        </select>
        <select value={filtruLocatie} onChange={(e) => setFiltruLocatie(e.target.value)}>
          <option value="">Toate locațiile</option>
          {optiuniLocatie.map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </select>
        <div className="filtru-actiuni">
          <button disabled>Filtrează</button>
          <Link to="/adauga-alerta" className="btn-link-alerta">Adaugă alertă manual</Link>
        </div>
      </div>

      <table className="tabel-alerte">
        <thead>
          <tr>
            <th>ID Tren</th>
            <th>Tip pericol</th>
            <th>Locație</th>
            <th>Severitate</th>
            <th>Data/Ora</th>
            <th>Status</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {alerteFiltrate.map((a, i) => (
            <tr key={i}>
              <td>{a.tren}</td>
              <td>{editIndex === i ? <input value={editData.tip} onChange={(e) => setEditData({ ...editData, tip: e.target.value })} /> : a.tip}</td>
              <td>{editIndex === i ? <input value={editData.locatie} onChange={(e) => setEditData({ ...editData, locatie: e.target.value })} /> : a.locatie}</td>
              <td>{editIndex === i ? (
                <select value={editData.severitate} onChange={(e) => setEditData({ ...editData, severitate: e.target.value })}>
                  <option>Scăzută</option>
                  <option>Mediu</option>
                  <option>Ridicată</option>
                </select>
              ) : a.severitate}</td>
              <td>{editIndex === i ? (
                <input type="datetime-local" value={editData.data} onChange={(e) => setEditData({ ...editData, data: e.target.value })} />
              ) : new Date(a.data).toLocaleString()}</td>
              <td className={`status ${a.status.toLowerCase()}`}>
                {editIndex === i ? (
                  <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                    <option>Nerezolvat</option>
                    <option>in curs</option>
                    <option>Rezolvat</option>
                  </select>
                ) : a.status}
              </td>
              <td>
                {editIndex === i ? (
                  <button className="btn-edit" onClick={handleSaveEdit}>Salvează</button>
                ) : (
                  <>
                    <button className="btn-edit" onClick={() => handleEditClick(i)}>Editează</button>
                    <button className="btn-delete" onClick={() => handleDelete(i)}>Șterge</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mapa">
        <MapContainer center={[45.9432, 24.9668]} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {alerteFiltrate.map((a, i) => (
            <Marker key={i} position={a.coord} icon={getMarkerIcon(a.status)}>
              <Popup>
                <strong>{a.tip}</strong><br />
                {a.locatie}<br />
                {new Date(a.data).toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Alerte;
