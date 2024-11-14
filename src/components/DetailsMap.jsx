import { useState, useEffect } from 'react';
import { fetchPlaceData } from '../services/googleMapsService';
import PropTypes from 'prop-types';

export default function DetailsMap({ selectedMarker }) {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedMarker) {
      fetchPlaceData(selectedMarker.placeId)
        .then((data) => {
          setDados(data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedMarker]);

  return (
    <div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div>
          {dados && dados.result && (
            <div>
              <h1>Dados</h1>
              <h2>Nome:</h2>
              <p>{dados.result.name}</p>
              <h2>Foto:</h2>

              <h2>Endereço:</h2>
              <p>{dados.result.formatted_address}</p>
              <h2>Telefone:</h2>
              <p>{dados.result.formatted_phone_number}</p>
              <h2>Avaliação:</h2>
              <p>{dados.result.rating} estrelas</p>
              {/*    <pre>{JSON.stringify(dados, null, 2)}</pre> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

DetailsMap.propTypes = {
  selectedMarker: PropTypes.object,
};
