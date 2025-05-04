import React from 'react';
import { Marker, Popup } from 'react-leaflet'; 
import L from 'leaflet';
import iconVerde from '../imagini/iconitaverde.png';
import iconGalben from '../imagini/iconitagalbena.png';
import iconRosu from '../imagini/iconitarosie.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

function getMarkerIcon(stare) {
  const stareNormalizata = (stare || '').toLowerCase();

  let icon;
  if (stareNormalizata === 'în circulație') icon = iconVerde;
  else if (stareNormalizata === 'întârziat') icon = iconRosu;
  else icon = iconGalben;

  return new L.Icon({
    iconUrl: icon,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36],
    shadowUrl: shadow,
    shadowSize: [40, 40],
  });
}

function TrenMarker({ tren }) {
  if (!tren || tren.lat == null || tren.lng == null) return null;

  const stare = tren.status || tren.stare || 'necunoscut';
  const stareNormalizata = stare.toLowerCase();

  return (
    <Marker position={[tren.lat, tren.lng]} icon={getMarkerIcon(stare)}>
      <Popup>
        <b>{tren.ruta || 'Rută nedefinită'}</b><br />
        Status:{' '}
        <span style={{
          color:
            stareNormalizata === 'în circulație'
              ? 'green'
              : stareNormalizata === 'întârziat'
                ? 'red'
                : 'orange'
        }}>
          {stare}
        </span><br />
        <b>Ora plecare:</b> {tren.oraPlecare || 'N/A'}<br />
        <b>Ora sosire:</b> {tren.oraSosire || 'N/A'}
      </Popup>
    </Marker>
  );
}

export default TrenMarker;
