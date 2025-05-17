// Função para fazer requisições com autenticação
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      console.error('Token inválido ou expirado');
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro na requisição');
    }

    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const conectTrips = async () => {
  try {
    const response = await fetchWithAuth(
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
    const response = await fetchWithAuth(
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

export const getBlog = async (id) => {
  try {
    console.log('Buscando post com ID:', id);
    const response = await fetchWithAuth(
      `https://elestaoviajando.onrender.com/api/posts/${id}`,
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar post');
    }
    const data = await response.json();
    console.log('Dados recebidos:', data);
    return data;
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

export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(
      `https://elestaoviajando.onrender.com/api/posts/${id}`,
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

export const deleteBlog = async (id) => {
  try {
    const response = await fetchWithAuth(
      `https://elestaoviajando.onrender.com/api/posts/${id}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao deletar post');
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

export async function getTrip(id) {
  try {
    console.log('Buscando viagem com ID:', id);
    const response = await fetchWithAuth(
      `https://elestaoviajando.onrender.com/api/trips/${id}`,
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar viagem');
    }
    const data = await response.json();
    console.log('Dados recebidos:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar viagem:', error);
    throw error;
  }
}
