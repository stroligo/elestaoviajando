import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useRoute } from 'wouter';

export function EditBlogPost() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/admin/blog/edit/:id');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    published: false,
    images: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      // TODO: Implementar chamada à API para buscar dados do post
      setLoading(false);
    }
  }, [params?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implementar chamada à API para atualizar post
    setLocation('/admin/blog');
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Autor
            </label>
            <input
              type="text"
              id="author"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Conteúdo
            </label>
            <textarea
              id="content"
              rows={10}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
            />
            <label
              htmlFor="published"
              className="ml-2 block text-sm text-gray-900"
            >
              Publicado
            </label>
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
