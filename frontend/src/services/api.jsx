export async function conectTrips() {
  const response = await fetch(
    'https://elestaoviajando.onrender.com/api/trips',
  );
  return await response.json();
}

export async function conectBlog() {
  const response = await fetch(
    'https://elestaoviajando.onrender.com/api/posts',
  );
  return await response.json();
}

export async function getTrip(id) {
  try {
    console.log('Buscando viagem com ID:', id);
    const response = await fetch(
      'https://elestaoviajando.onrender.com/api/trips',
    );
    const data = await response.json();
    console.log('Dados recebidos:', data);

    const trip = data.find((trip) => trip._id === id);
    console.log('Viagem encontrada:', trip);

    return trip;
  } catch (error) {
    console.error('Erro ao buscar viagem:', error);
    throw error;
  }
}
export async function getTripByCity(city) {
  const response = await fetch(
    'https://elestaoviajando.onrender.com/api/trips',
  );
  const data = await response.json();
  const trip = data.find(
    (trip) => trip.city.toLowerCase() === city.toLowerCase(),
  );

  if (trip) {
    // Adiciona a URL base do Cloudinary para as imagens
    trip.images = trip.images.map((image) =>
      image.startsWith('http')
        ? image
        : `https://res.cloudinary.com/drn1sflf0/image/upload/v1747421200/${image}`,
    );
  }

  return trip;
}

export async function getBlog(id) {
  const response = await fetch(
    'https://elestaoviajando.onrender.com/api/posts',
  );
  const data = await response.json();
  const dataId = data.find((blog) => blog.id === id);
  return dataId;
}

export async function getWeather(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Latitude e longitude são obrigatórias');
  }

  const API_KEY = 'be16c876a4dd3f05bb88eeeef8d8e7fd';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  return await response.json();
}
