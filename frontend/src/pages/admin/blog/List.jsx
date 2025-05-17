import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { conectBlog } from '@/services/api';

export function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await conectBlog();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        const response = await fetch(
          `https://elestaoviajando.onrender.com/api/posts/${id}`,
          {
            method: 'DELETE',
          },
        );

        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== id));
        } else {
          console.error('Erro ao deletar post');
        }
      } catch (error) {
        console.error('Erro ao deletar post:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Posts</h1>
        <Link href="/admin/blog/create">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Novo Post
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
                  Título
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
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{post.titulo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/blog/edit/${post._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Editar
                      </button>
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(post._id)}
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
