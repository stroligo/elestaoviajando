import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useRoute } from 'wouter';
import { getTrip } from '@/services/api';

export function EditTrip() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/admin/trips/edit/:id');
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    date: '',
    description: '',
    images: [],
    tags: [],
    coordinates: {
      lat: '',
      lng: '',
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      if (params?.id) {
        try {
          const trip = await getTrip(params.id);
          if (trip) {
            setFormData({
              city: trip.city || '',
              country: trip.country || '',
              date: trip.date
                ? new Date(trip.date).toISOString().split('T')[0]
                : '',
              description: trip.description ? trip.description.join('\n') : '',
              images: trip.images || [],
              tags: trip.tags || [],
              coordinates: {
                lat: trip.coordinates?.lat || '',
                lng: trip.coordinates?.lng || '',
              },
            });
          }
        } catch (error) {
          console.error('Erro ao carregar viagem:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadTrip();
  }, [params?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://elestaoviajando.onrender.com/api/trips/${params.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            description: formData.description.split('\n'),
          }),
        },
      );

      if (response.ok) {
        setLocation('/admin/trips');
      } else {
        console.error('Erro ao atualizar viagem');
      }
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // TODO: Implementar upload de imagens
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Editar Viagem</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Cidade
            </label>
            <input
              type="text"
              id="city"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              País
            </label>
            <input
              type="text"
              id="country"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              id="tags"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lat"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                type="number"
                step="any"
                id="lat"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.coordinates.lat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coordinates: {
                      ...formData.coordinates,
                      lat: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="lng"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                type="number"
                step="any"
                id="lng"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.coordinates.lng}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coordinates: {
                      ...formData.coordinates,
                      lng: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Imagens
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="mt-1 block w-full"
              onChange={handleImageChange}
            />
            {formData.images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setLocation('/admin/trips')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
