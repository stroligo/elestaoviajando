import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useRoute } from 'wouter';
import { getBlog } from '@/services/api';

export function EditBlogPost() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/admin/blog/edit/:id');
  const [formData, setFormData] = useState({
    titulo: '',
    date: '',
    description: '',
    hashtag: [],
    images: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (params?.id) {
        try {
          const post = await getBlog(params.id);
          if (post) {
            setFormData({
              titulo: post.titulo || '',
              date: post.date
                ? new Date(post.date).toISOString().split('T')[0]
                : '',
              description: post.description ? post.description.join('\n') : '',
              hashtag: post.hashtag || [],
              images: post.images || [],
            });
          }
        } catch (error) {
          console.error('Erro ao carregar post:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadPost();
  }, [params?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://elestaoviajando.onrender.com/api/posts/${params.id}`,
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
        setLocation('/admin/blog');
      } else {
        console.error('Erro ao atualizar post');
      }
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
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
        <h1 className="text-2xl font-bold mb-6">Editar Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              id="titulo"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
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
              htmlFor="hashtag"
              className="block text-sm font-medium text-gray-700"
            >
              Hashtags (separadas por vírgula)
            </label>
            <input
              type="text"
              id="hashtag"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.hashtag.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hashtag: e.target.value.split(',').map((tag) => tag.trim()),
                })
              }
            />
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
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setLocation('/admin/blog')}
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
