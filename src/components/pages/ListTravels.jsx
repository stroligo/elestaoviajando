import { Card } from '../card';

export function ListTravels() {
  return (
    <section>
      <div className="h1 bg-red-300">Todas as viagens</div>
      <div className="grid grid-cols-3 gap-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}
