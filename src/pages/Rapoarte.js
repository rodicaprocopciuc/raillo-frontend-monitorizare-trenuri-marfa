import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Rapoarte.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Rapoarte = () => {
  const [selectedTren, setSelectedTren] = useState('');
  const [selectedRuta, setSelectedRuta] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null);

  const trenuri = [
    { id: 101 },
    { id: 102 },
    { id: 103 },
  ];

  const rute = [
    'București – Timișoara',
    'București – Brașov',
    'Constanța – Oradea',
    'Cluj – Iași',
    'Sibiu – Timișoara',
  ];

  const getDataForGraph = () => {
    if (selectedTren && selectedRuta && startDate && endDate) {
      return {
        labels: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Volume Transportate',
            data: [120, 150, 180, 220, 250, 200, 180, 160, 170, 190, 210, 230],
            borderColor: 'blue',
            tension: 0.4,
            fill: false,
          },
        ],
      };
    } else {
      return null;
    }
  };

  const updateGraph = () => {
    const data = getDataForGraph();
    if (data) {
      setChartData(data);
    } else {
      alert('Te rog completează toate câmpurile pentru a actualiza graficul.');
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Raport Volume Transportate', 20, 20);

    const canvas = document.getElementById('chart');
    if (canvas) {
      const chartImage = canvas.toDataURL('image/png');
      doc.addImage(chartImage, 'PNG', 20, 30, 170, 80);
      doc.save('raport_volume_transportate.pdf');
    } else {
      alert('Nu există grafic pentru export.');
    }
  };

  return (
    <div className="rapoarte-container">
      <h2 className="rapoarte-title">Rapoarte-statistici trenuri</h2>
      <div className="rapoarte-actions">
        <select onChange={(e) => setSelectedTren(e.target.value)} value={selectedTren}>
          <option value="">Selectează ID Tren</option>
          {trenuri.map((tren) => (
            <option key={tren.id} value={tren.id}>{tren.id}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedRuta(e.target.value)} value={selectedRuta}>
          <option value="">Selectează rută</option>
          {rute.map((ruta, index) => (
            <option key={index} value={ruta}>{ruta}</option>
          ))}
        </select>

        <label>De la:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Până la:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={updateGraph}>Actualizează Graficul</button>
        <button onClick={exportToPDF}>Exportă PDF</button>
      </div>

      <div className="chart-container">
        <h3>Volume Transportate</h3>
        {chartData ? (
          <Line data={chartData} id="chart" />
        ) : (
          <p>Te rog selectează toate opțiunile și apasă „Actualizează” pentru a vizualiza graficul.</p>
        )}
      </div>
    </div>
  );
};

export default Rapoarte;
