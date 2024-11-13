import DetailsMap from './components/DetailsMap';
import Map from './components/Map';

export function App() {
  const placeId = 'ChIJr8BrlrypGA0RWAx8iySpTEg';

  return (
    <div>
      <h1>Aplicação</h1>
      <Map />
      <DetailsMap placeId={placeId} />
    </div>
  );
}
