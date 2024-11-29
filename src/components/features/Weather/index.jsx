import PropTypes from 'prop-types';

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

/**
 * Renderiza as informações climáticas para uma cidade.
 *
 * @param {{ weather: { main: { temp: number, temp_min: number, temp_max: number, humidity: number }, wind: { speed: number, deg: number }, weather: { description: string }[] } }} props
 * @returns {JSX.Element}
 */
export function Weather({ weather }) {
  if (!weather || !weather.weather || !weather.weather[0]) {
    return <div>Não foi possível obter o clima</div>;
  }

  const description = weather.weather[0].description;
  const translatedDescription = weatherDescriptions[description.toLowerCase()];

  return (
    <table>
      <tr>
        <td className="font-bold">Temperatura atual</td>
        <td>
          {weather.main ? (weather.main.temp - 273.15).toFixed(1) : ''} °C
        </td>
      </tr>
      <tr>
        <td className="font-bold">Condição do tempo</td>
        <td>{translatedDescription || description}</td>
      </tr>
      <tr>
        <td className="font-bold">Temperatura mínima</td>
        <td>
          {weather.main ? (weather.main.temp_min - 273.15).toFixed(1) : ''} °C
        </td>
      </tr>
      <tr>
        <td className="font-bold">Temperatura máxima</td>
        <td>
          {weather.main ? (weather.main.temp_max - 273.15).toFixed(1) : ''} °C
        </td>
      </tr>
      <tr>
        <td className="font-bold">Umidade</td>
        <td>{weather.main ? weather.main.humidity : ''}%</td>
      </tr>
      <tr>
        <td className="font-bold">Vento</td>
        <td>
          {weather.wind ? weather.wind.speed : ''} m/s (
          {weather.wind ? weather.wind.deg : ''}°)
        </td>
      </tr>
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
};
