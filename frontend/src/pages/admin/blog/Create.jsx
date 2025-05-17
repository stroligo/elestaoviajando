import { useState } from 'react';
import { useLocation } from 'wouter';
import { conectBlogs } from '@/services/api';
import { CLOUDINARY_BASE_URL } from '@/utils/cloudinary';

export function CreateBlog() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    date: new Date().toISOString().split('T')[0],
    hashtag: '',
    images: [],
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHashtagChange = (e) => {
    const hashtags = e.target.value.split(',').map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      hashtag: hashtags,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'elestaoviajando');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/drn1sflf0/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error('Erro ao fazer upload da imagem');
        }

        const data = await response.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
      alert('Erro ao fazer upload das imagens. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        images: formData.images.map((image) =>
          image.includes(CLOUDINARY_BASE_URL)
            ? image.replace(CLOUDINARY_BASE_URL, '')
            : image,
        ),
      };

      const response = await fetch(
        'https://elestaoviajando.onrender.com/api/blogs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        },
      );

      if (!response.ok) {
        throw new Error('Erro ao criar blog');
      }

      setLocation('/admin/blog');
    } catch (error) {
      console.error('Erro ao criar blog:', error);
      alert('Erro ao criar blog. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Criar Novo Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray mb-2"
            >
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray mb-2"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="hashtag"
              className="block text-sm font-medium text-gray mb-2"
            >
              Hashtags (separadas por vírgula)
            </label>
            <input
              type="text"
              id="hashtag"
              name="hashtag"
              value={formData.hashtag.join(', ')}
              onChange={handleHashtagChange}
              className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray mb-2"
            >
              Conteúdo
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="10"
              className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray mb-2"
            >
              Imagens
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-brown text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setLocation('/admin/blog')}
              className="px-4 py-2 border border-gray-light rounded-md text-gray hover:bg-gray-extralight transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando...' : 'Criar Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
