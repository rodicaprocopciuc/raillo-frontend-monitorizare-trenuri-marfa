import { useState, useEffect } from 'react';

function useFetchTrenuri() {
  const [trenuri, setTrenuri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('/trenuri.json')
        .then((response) => {
          if (!response.ok) throw new Error('Răspuns invalid de la server');
          return response.json();
        })
        .then((data) => {
          const trenuriValide = data.filter(tren =>
            tren &&
            typeof tren.lat === 'number' &&
            typeof tren.lng === 'number'
          );
          setTrenuri(trenuriValide);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Eroare la preluarea datelor:', err);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { trenuri, loading };
}

export default useFetchTrenuri;
