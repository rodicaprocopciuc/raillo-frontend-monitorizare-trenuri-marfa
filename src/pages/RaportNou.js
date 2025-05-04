import React, { useState, useRef, useEffect } from 'react';
import './RaportNou.css';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(...registerables);

function RaportNou() {
  const [chartType, setChartType] = useState('pie');
  const chartRef = useRef(null);

  const [selectedTren, setSelectedTren] = useState('');
  const [selectedRuta, setSelectedRuta] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [data, setData] = useState({
    labels: ['În circulație', 'Planificat', 'Întârziat', 'Anulat'],
    datasets: [{
      label: 'Trenuri',
      data: [30, 25, 35, 10],
      backgroundColor: ['#3b82f6', '#22c55e', '#facc15', '#f97316']
    }]
  });

  useEffect(() => {
    const ctx = document.getElementById('raportChart');
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          title: { display: false }
        }
      }
    });
  }, [chartType, data]);

  const genereazaRaport = () => {
    if (!selectedTren || !selectedRuta || !selectedDate) {
      alert('Completează toate câmpurile pentru a genera raportul.');
      return;
    }

    let newData;
    if (selectedTren === '101' && selectedRuta.includes('Brașov')) {
      newData = [50, 20, 20, 10];
    } else if (selectedTren === '102') {
      newData = [20, 40, 30, 10];
    } else {
      newData = [25, 25, 25, 25];
    }

    setData({
      labels: ['În circulație', 'Planificat', 'Întârziat', 'Anulat'],
      datasets: [{
        label: 'Trenuri',
        data: newData,
        backgroundColor: ['#3b82f6', '#22c55e', '#facc15', '#f97316']
      }]
    });
  };

  const exportPDF = () => {
    const chartCanvas = document.getElementById('chart-container');
    html2canvas(chartCanvas).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 15, 15, 180, 160);
      pdf.save('raport.pdf');
    });
  };

  return (
    <div className="raportnou-container">
      <h2>Rapoarte-distribuție status</h2>
      <div className="form-controls">
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

        <select value={selectedTren} onChange={(e) => setSelectedTren(e.target.value)}>
          <option value="">Selectează tren</option>
          <option value="101">Tren 101</option>
          <option value="102">Tren 102</option>
        </select>

        <select value={selectedRuta} onChange={(e) => setSelectedRuta(e.target.value)}>
          <option value="">Selectează rută</option>
          <option value="București - Brașov">Rută: București - Brașov</option>
          <option value="Constanța - Oradea">Rută: Constanța - Oradea</option>
        </select>

        <div className="button-group">
          <button onClick={genereazaRaport}>Generează raport</button>
          <button onClick={exportPDF}>Exportă PDF</button>
        </div>
      </div>

      <div className="chart-type-buttons">
        <button onClick={() => setChartType('line')} className={chartType === 'line' ? 'active' : ''}>Linie</button>
        <button onClick={() => setChartType('bar')} className={chartType === 'bar' ? 'active' : ''}>Bară</button>
        <button onClick={() => setChartType('pie')} className={chartType === 'pie' ? 'active' : ''}>Paj</button>
      </div>

      <div className="chart-section" id="chart-container">
        <h3>Raport grafic</h3>
        <canvas id="raportChart"></canvas>
      </div>
    </div>
  );
}

export default RaportNou;
