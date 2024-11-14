import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';

import { fetchPlaceDetails } from '../services/googleMapsService';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Map({ Data, setSelectedMarker }) {
  // Funções auxiliares
  const getPlaceId = React.useCallback(
    (marker) => {
      const data = Data.find((data) => {
        if (
          data &&
          data.visit &&
          data.visit.topCandidate &&
          data.visit.topCandidate.placeLocation
        ) {
          const [lat, lng] = data.visit.topCandidate.placeLocation
            .split(':')[1]
            .split(',');
          return lat === marker.lat.toString() && lng === marker.lng.toString();
        }
        return false;
      });

      if (data && data.visit && data.visit.topCandidate) {
        return data.visit.topCandidate.placeID;
      }

      return null;
    },
    [Data],
  );

  // Estilos e configurações
  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: 55.919807614455316,
    lng: 9.50815253234697,
  };

  // Estados
  const [selectedMarkerLocal, setSelectedMarkerLocal] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  // Funções de manipulação
  const handleMarkerClick = (marker) => {
    const placeId = getPlaceId(marker);
    setSelectedMarker({ placeId, lat: marker.lat, lng: marker.lng });
    setSelectedMarkerLocal({ lat: marker.lat, lng: marker.lng });
    setInfoWindowOpen(true);
  };

  // Hooks
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
  });

  const mapRef = useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    /*    console.log('Zoom:', map.getZoom());
    console.log('Latitude:', map.getCenter().lat());
    console.log('Longitude:', map.getCenter().lng()); */
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = null;
  }, []);

  const locations = useMemo(
    () =>
      Data.map((data) => {
        const [lat, lng] = data.visit.topCandidate.placeLocation
          .split(':')[1]
          .split(',');
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      }),
    [Data],
  );

  useEffect(() => {
    if (selectedMarkerLocal && infoWindowOpen) {
      const placeId = getPlaceId(selectedMarkerLocal);
      fetchPlaceDetails(placeId)
        .then((placeDetails) => setPlaceDetails(placeDetails))
        .catch((error) =>
          console.error('Error fetching place details:', error),
        );
    }
  }, [selectedMarkerLocal, infoWindowOpen, getPlaceId]);

  // Renderização
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location}
          onClick={() => {
            handleMarkerClick(location);
          }}
        />
      ))}
      {infoWindowOpen && placeDetails && (
        <InfoWindow
          position={selectedMarkerLocal}
          onCloseClick={() => setSelectedMarkerLocal(null)}
          disableAutoPan={true}
          /*         pixelOffset={{ x: 0, y: -20 }} */
        >
          <div>
            <h2>{placeDetails.name}</h2>
            <p>{placeDetails.formatted_address}</p>
            <p>{placeDetails.formatted_phone_number}</p>
            {/*        <p>Avaliação: {placeDetails.rating} estrelas</p>
            <p>{placeDetails.reviews}</p> */}
            <a href={placeDetails.website}>Site</a>
            {placeDetails.photos && placeDetails.photos[0] && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${googleMapsApiKey}`}
                className="h-32"
              />
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}
Map.propTypes = {
  setSelectedMarker: PropTypes.func.isRequired,
  Data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
