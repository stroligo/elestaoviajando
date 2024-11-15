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
            <div className="bg-gray-100 w-[400px] p-6 rounded-md">
              <div className="flex gap-2">
                <span className="font-bold">Nome:</span>
                <span>{dados.result.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Endereço:</span>
                <span>{dados.result.formatted_address}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Telefone:</span>
                <span>{dados.result.formatted_phone_number}</span>
              </div>
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
