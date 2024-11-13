import React, { useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import Data from '../database/2024.json';

export default function Map() {
  const containerStyle = {
    width: '100%',
    height: '600px',
  };

  const center = {
    lat: 55.919807614455316,
    lng: 9.50815253234697,
  };
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);

  const handleMarkerClick = (marker) => {
    const placeId = Data.find((data) => {
      const [lat, lng] = data.visit.topCandidate.placeLocation
        .split(':')[1]
        .split(',');
      return lat === marker.lat.toString() && lng === marker.lng.toString();
    }).visit.topCandidate.placeID;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCHT_DQUhRKEr3eKVvdDUIdxIIc1LvSR0o`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const placeDetails = data.result;
        setSelectedMarker({ lat: marker.lat, lng: marker.lng });
        setPlaceDetails(placeDetails);
      });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCHT_DQUhRKEr3eKVvdDUIdxIIc1LvSR0o',
  });

  const mapRef = useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    console.log('Zoom:', map.getZoom());
    console.log('Latitude:', map.getCenter().lat());
    console.log('Longitude:', map.getCenter().lng());
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = null;
  }, []);

  const locations = Data.map((data) => {
    const [lat, lng] = data.visit.topCandidate.placeLocation
      .split(':')[1]
      .split(',');
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  });

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
      {selectedMarker && placeDetails && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker(null)}
          disableAutoPan={true}
          pixelOffset={{ x: 0, y: -20 }}
        >
          <div>
            <h2>{placeDetails.name}</h2>
            <p>{placeDetails.formatted_address}</p>
            {placeDetails.formatted_phone_number && (
              <p>{placeDetails.formatted_phone_number}</p>
            )}
            {placeDetails.website && <p>{placeDetails.website}</p>}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}
