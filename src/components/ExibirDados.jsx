import Data from '../database/2024.json';

export function ExibirDados() {
  return (
    <>
      {Data.map((data) => {
        const [lat, lng] = data.visit.topCandidate.placeLocation
          .split(':')[1]
          .split(',');
        const location = {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        };

        return (
          <div key={data._id.$oid}>
            <div>{data.visit.hierarchyLevel}</div>
            <div>{data.visit.topCandidate.probability}</div>
            <div>{data.visit.topCandidate.semanticType}</div>
            <div>{data.visit.topCandidate.placeID}</div>
            <div>
              Latitude:
              {location.lat}
            </div>
            <div>
              Longitude:
              {location.lng}
            </div>
            <div> {data.visit.probability}</div>
          </div>
        );
      })}
    </>
  );
}
