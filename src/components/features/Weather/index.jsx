import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { getWeather } from '@/services/api';
const weatherDescriptions = {
  'clear sky': 'Céu limpo',
  'few clouds': 'Poucas nuvens',
  'scattered clouds': 'Nuvens dispersas',
  'broken clouds': 'Nuvens quebradas',
  'overcast clouds': 'Nuvens cobertas',
  'light rain': 'Chuva leve',
  'shower rain': 'Chuva de pancada',
  rain: 'Chuva',
  thunderstorm: 'Tempestade',
  snow: 'Neve',
  mist: 'Névoa',
};

export function Weather({ lat, lon }) {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    async function loadWeather() {
      const response = await getWeather(lat, lon);
      setWeatherData(response);
    }
    loadWeather();
  }, [lat, lon]);

  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return <div>Não foi possível obter o clima</div>;
  }

  const description = weatherData.weather[0].description;
  const translatedDescription = weatherDescriptions[description.toLowerCase()];

  return (
    <table>
      <tbody>
        <tr>
          <td className="font-bold">Temperatura atual</td>
          <td>
            {weatherData.main
              ? (weatherData.main.temp - 273.15).toFixed(1)
              : ''}{' '}
            °C
          </td>
        </tr>
        <tr>
          <td className="font-bold">Condição do tempo</td>
          <td>{translatedDescription || description}</td>
        </tr>
        <tr>
          <td className="font-bold">Temperatura mínima</td>
          <td>
            {weatherData.main
              ? (weatherData.main.temp_min - 273.15).toFixed(1)
              : ''}{' '}
            °C
          </td>
        </tr>
        <tr>
          <td className="font-bold">Temperatura máxima</td>
          <td>
            {weatherData.main
              ? (weatherData.main.temp_max - 273.15).toFixed(1)
              : ''}{' '}
            °C
          </td>
        </tr>
        <tr>
          <td className="font-bold">Umidade</td>
          <td>{weatherData.main ? weatherData.main.humidity : ''}%</td>
        </tr>
        <tr>
          <td className="font-bold">Vento</td>
          <td>
            {weatherData.wind ? weatherData.wind.speed : ''} m/s (
            {weatherData.wind ? weatherData.wind.deg : ''}°)
          </td>
        </tr>
      </tbody>
    </table>
  );
}

Weather.propTypes = {
  weather: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number,
      temp_min: PropTypes.number,
      temp_max: PropTypes.number,
      humidity: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
      }),
    ),
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number,
    }),
  }),
  lat: PropTypes.number,
  lon: PropTypes.number,
};
