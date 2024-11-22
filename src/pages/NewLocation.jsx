import { Map } from '../components/features/Map';

export function NewLocation() {
  return (
    <section>
      <div className="flex flex-col gap-8">
        <h2>New Location</h2>
        <Map />
      </div>
    </section>
  );
}
