import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import useFetchTrenuri from '../hooks/useFetchTrenuri';
import TrenMarker from './TrenMarker';
import Legend from './Legend';

function HartaTrenuri({ filtru = null, miniMode = false, idTrenSelectat = null }) {
  const { trenuri, loading } = useFetchTrenuri();

  if (loading) return <div>Se încarcă...</div>;
  if (!trenuri || trenuri.length === 0) return <div>Nu există trenuri disponibile.</div>;

  
  const filtruStare = filtru?.stare?.toLowerCase?.() || 'toate';
  const filtruId = filtru?.id?.toLowerCase?.() || '';
  const filtruRuta = filtru?.ruta?.toLowerCase?.() || '';

  const trenuriFiltrate = trenuri.filter(tren => {
    if (!tren) return false;

    const ruta = (tren.ruta || '').toLowerCase();
    const id = tren.id?.toString().toLowerCase?.() || '';
    const stare = (tren.stare || tren.status || '').toLowerCase();

    const stareOk = filtruStare === 'toate' || stare.includes(filtruStare);
    const idOk = !filtruId || id.includes(filtruId);
    const rutaOk = !filtruRuta || ruta.includes(filtruRuta);

    return stareOk && idOk && rutaOk;
  });

  const trenuriDeAfisat = idTrenSelectat
    ? trenuri.filter(tren => tren.id.toString() === idTrenSelectat)
    : trenuriFiltrate;

  const zoom = miniMode ? 6 : 7;
  const height = miniMode ? '300px' : '500px';

  return (
    <div>
      <MapContainer center={[45.9432, 24.9668]} zoom={zoom} style={{ width: '100%', height }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {trenuriDeAfisat.map(tren => (
          <TrenMarker key={tren.id} tren={tren} />
        ))}
        {!miniMode && <Legend />}
      </MapContainer>
    </div>
  );
}

export default HartaTrenuri;
