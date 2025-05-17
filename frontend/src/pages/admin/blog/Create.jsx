import { useState } from 'react';
import { useLocation } from 'wouter';

export function CreateBlogPost() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    published: false,
    images: [],
    tags: '',
    excerpt: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implementar chamada à API para criar post
    setLocation('/admin/blog');
  };

  /*   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // TODO: Implementar upload de imagens
  }; */

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Novo Post</h1>
          <button
            onClick={() => setLocation('/admin/blog')}
            className="text-gray-600 hover:text-gray-900"
          >
            Voltar
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 gap-6">
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
                placeholder="Digite o título do post"
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
                placeholder="Nome do autor"
              />
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700"
              >
                Resumo
              </label>
              <textarea
                id="excerpt"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Breve descrição do post"
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
                placeholder="Conteúdo do post"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="Separe as tags por vírgula"
              />
              <p className="mt-1 text-sm text-gray-500">
                Exemplo: viagem, europa, paris
              </p>
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
                /*  onChange={handleImageChange} */
              />
              <p className="mt-1 text-sm text-gray-500">
                Você pode selecionar múltiplas imagens
              </p>
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
                Publicar imediatamente
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
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
              Criar Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
