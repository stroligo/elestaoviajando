export const conectTrips = async () => {
  try {
    const response = await fetch(
      'https://elestaoviajando.onrender.com/api/trips',
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar viagens');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar viagens:', error);
    throw error;
  }
};

export const conectBlogs = async () => {
  try {
    const response = await fetch(
      'https://elestaoviajando.onrender.com/api/posts',
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export const getBlog = async (slug) => {
  try {
    const response = await fetch(
      `https://elestaoviajando.onrender.com/api/posts/${slug}`,
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await fetch(
      'https://elestaoviajando.onrender.com/api/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      },
    );
    if (!response.ok) {
      throw new Error('Erro ao criar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
};

export const updateBlog = async (slug, blogData) => {
  try {
    const response = await fetch(
      `https://elestaoviajando.onrender.com/api/posts/${slug}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      },
    );
    if (!response.ok) {
      throw new Error('Erro ao atualizar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
};

export const deleteBlog = async (slug) => {
  try {
    const response = await fetch(
      `https://elestaoviajando.onrender.com/api/posts/${slug}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Erro ao deletar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    throw error;
  }
};

export const getWeather = async (lat, lon) => {
  try {
    const API_KEY = '8c247ea0b4b6ed5558be9f656b5a3f5c';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`,
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do clima');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    throw error;
  }
};

export const getTrip = async (id) => {
  try {
    const response = await fetch(
      `https://elestaoviajando.onrender.com/api/trips/${id}`,
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar viagem');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar viagem:', error);
    throw error;
  }
};
