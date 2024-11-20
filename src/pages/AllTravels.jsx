import { Trips } from '../components/features/Trips';

export function AllTravels() {
  return (
    <section>
      <div className="flex flex-col gap-8">
        <h2>Todas as viagens</h2>
        <Trips />
      </div>
    </section>
  );
}
