import { useState, useEffect } from 'react';
import Map from './components/Map';
import DetailsMap from './components/DetailsMap';

export function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState(null);

  const handleYearChange = (newYear) => {
    setYear(newYear);
    setSelectedMarker(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../public/database/${year}.json`);
        setData(response.default);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [year]);

  return (
    <section>
      <div className="container mx-auto px-5">
        <h1>APP</h1>
        <div>Ano selecionado: {year}</div>
        <div className="flex gap-2">
          <button
            className={year === 2021 ? 'active' : ''}
            onClick={() => handleYearChange(2021)}
          >
            2021
          </button>
          <button
            className={year === 2022 ? 'active' : ''}
            onClick={() => handleYearChange(2022)}
          >
            2022
          </button>
          <button
            className={year === 2023 ? 'active' : ''}
            onClick={() => handleYearChange(2023)}
          >
            2023
          </button>
          <button
            className={year === 2024 ? 'active' : ''}
            onClick={() => handleYearChange(2024)}
          >
            2024
          </button>
        </div>
        <div className="flex flex-col">
          <div className="">
            <DetailsMap selectedMarker={selectedMarker} />
          </div>
          <div className="">
            {data && <Map Data={data} setSelectedMarker={setSelectedMarker} />}
          </div>
        </div>
      </div>
    </section>
  );
}
