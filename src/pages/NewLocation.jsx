import { MapGlobal } from '@/components/Map/Global';

export function NewLocation() {
  return (
    <section>
      <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
        <h2>New Location</h2>
        <MapGlobal />
      </div>
    </section>
  );
}
