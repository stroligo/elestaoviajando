import { MapGlobal } from '../components/map/MapGlobal';

export function NewLocation() {
  return (
    <section>
      <div className="flex flex-col gap-8">
        <h2>New Location</h2>
        <MapGlobal />
      </div>
    </section>
  );
}
