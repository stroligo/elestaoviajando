export async function getViagens() {
  const response = await fetch('/data/viagens.json');

  return await response.json();
}

export async function getViagemById(id) {
  const response = await fetch('/data/viagens.json');
  const data = await response.json();
  const viagem = data.locations.find(
    (location) => location.id === parseInt(id),
  );
  return viagem;
}
export async function getViagemByCity(city) {
  const response = await fetch('/data/viagens.json');
  const data = await response.json();
  const viagem = data.locations.find(
    (location) => location.id === parseInt(city),
  );
  return viagem;
}
