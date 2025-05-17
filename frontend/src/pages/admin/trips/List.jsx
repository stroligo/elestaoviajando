import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { conectTrips } from '@/services/api';

export function TripsList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      try {
        const data = await conectTrips();
        setTrips(data);
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta viagem?')) {
      try {
        const response = await fetch(
          `https://elestaoviajando.onrender.com/api/trips/${id}`,
          {
            method: 'DELETE',
          },
        );

        if (response.ok) {
          setTrips(trips.filter((trip) => trip._id !== id));
        } else {
          console.error('Erro ao deletar viagem');
        }
      } catch (error) {
        console.error('Erro ao deletar viagem:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Viagens </h1>
        <Link href="/admin/trips/create">
          <button className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-600">
            Nova Viagem
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  País
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{trip.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trip.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(trip.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/trips/edit/${trip._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Editar
                      </button>
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(trip._id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
