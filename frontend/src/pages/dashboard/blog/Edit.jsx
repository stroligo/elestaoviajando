import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CLOUDINARY_BASE_URL } from '@/utils/cloudinary';
import { Slugify } from '@/utils/stringUtils';
import { fetchWithAuth } from '@/services/api';
import { IntroSection } from '@/components/features/IntroSection';

export function EditBlog({ setActiveComponent, blogId }) {
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    date: '',
    description: [],
    images: [],
    hashtag: [],
    status: 'draft',
  });

  useEffect(() => {
    async function loadBlog() {
      try {
        const response = await fetchWithAuth(
          `https://elestaoviajando.onrender.com/api/posts/${blogId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...data,
            images: data.images.map(
              (image) => `${CLOUDINARY_BASE_URL}${image}`,
            ),
          });
        }
      } catch (error) {
        console.error('Erro ao carregar blog:', error);
      }
    }
    loadBlog();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slug = Slugify(formData.titulo);
      const response = await fetchWithAuth(
        `https://elestaoviajando.onrender.com/api/posts/${blogId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            slug,
            thumbnail: formData.images[0]?.includes(CLOUDINARY_BASE_URL)
              ? formData.images[0].replace(CLOUDINARY_BASE_URL, '')
              : formData.images[0],
            images: formData.images.map((image) =>
              image.includes(CLOUDINARY_BASE_URL)
                ? image.replace(CLOUDINARY_BASE_URL, '')
                : image,
            ),
          }),
        },
      );

      if (response.ok) {
        setActiveComponent('blogs');
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar blog:', errorData);
        throw new Error(errorData.message || 'Erro ao atualizar blog');
      }
    } catch (error) {
      console.error('Erro ao atualizar blog:', error);
      alert('Erro ao atualizar blog. Por favor, tente novamente.');
    }
  };

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

  const handleDescriptionChange = (e) => {
    const paragraphs = e.target.value.split('\n\n').filter((p) => p.trim());
    setFormData((prev) => ({
      ...prev,
      description: paragraphs,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drn1sflf0/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Falha no upload');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <div className="flex justify-between items-center mb-0">
        <IntroSection title="Editar Post" subtitle="" />

        <button
          onClick={() => setActiveComponent('blogs')}
          className="text-gray hover:text-primary transition-colors"
        >
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              htmlFor="status"
              className="block text-sm font-medium text-gray mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray mb-2"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description.join('\n\n')}
            onChange={handleDescriptionChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Imagens
          </label>
          <div className="mt-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-light border-dashed rounded-lg cursor-pointer bg-gray-extralight hover:bg-gray-light transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray">
                    <span className="font-semibold">
                      Clique para fazer upload
                    </span>{' '}
                    ou arraste e solte
                  </p>
                  <p className="text-xs text-gray">PNG, JPG ou JPEG</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImages}
                />
              </label>
            </div>
          </div>

          {uploadingImages && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setActiveComponent('blogs')}
            className="px-6 py-2 border border-gray-light rounded-md text-gray hover:bg-gray-extralight transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={uploadingImages}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingImages ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

EditBlog.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  blogId: PropTypes.string.isRequired,
};

export default EditBlog;
