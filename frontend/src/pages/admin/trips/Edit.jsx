import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useRoute } from 'wouter';
import { getTrip } from '@/services/api';
import { CLOUDINARY_BASE_URL } from '@/utils/cloudinary';

// Usando o preset correto para uploads não assinados
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';

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
  const [imageError, setImageError] = useState({});
  const [uploadingImages, setUploadingImages] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

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
      console.log('Enviando imagens:', formData.images);
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
            images: formData.images.map((image) =>
              image.replace(CLOUDINARY_BASE_URL, ''),
            ),
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

  const uploadToCloudinary = async (file) => {
    // Extrair o diretório da primeira imagem existente
    const existingImage = formData.images[0];
    let folder = '';

    if (existingImage) {
      // Se a imagem começa com a URL base do Cloudinary, removê-la
      const imagePath = existingImage.startsWith(CLOUDINARY_BASE_URL)
        ? existingImage.replace(CLOUDINARY_BASE_URL, '')
        : existingImage;

      // Extrair o diretório (tudo antes do último /)
      const lastSlashIndex = imagePath.lastIndexOf('/');
      if (lastSlashIndex !== -1) {
        // Remover qualquer '..' ou caracteres inválidos do caminho
        folder = imagePath
          .substring(0, lastSlashIndex)
          .replace(/\.\./g, '')
          .replace(/[^a-zA-Z0-9-_/]/g, '');
      }
    }

    // Se não houver diretório válido, usar a data da publicação da viagem
    if (!folder && formData.date) {
      const date = new Date(formData.date);
      folder = `trips/${date.getFullYear()}/${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    uploadFormData.append('folder', folder);

    try {
      console.log('Iniciando upload para Cloudinary:', {
        file: file.name,
        size: file.size,
        type: file.type,
        folder: folder,
        tripDate: formData.date,
      });

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drn1sflf0/image/upload',
        {
          method: 'POST',
          body: uploadFormData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro detalhado do Cloudinary:', errorData);
        throw new Error(
          `Erro no upload da imagem: ${
            errorData.error?.message || 'Erro desconhecido'
          }`,
        );
      }

      const data = await response.json();
      console.log('Resposta do Cloudinary:', data);
      return data.secure_url;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validar tipos de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      alert(
        'Por favor, selecione apenas imagens nos formatos: JPG, PNG, GIF ou WEBP',
      );
      return;
    }

    // Validar tamanho dos arquivos (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    const oversizedFiles = files.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      alert('Por favor, selecione imagens com tamanho máximo de 5MB');
      return;
    }

    // Criar URLs de prévia para as novas imagens
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);

    setUploadingImages(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      console.log('URLs enviadas:', uploadedUrls);

      setFormData((prev) => {
        const newImages = [...prev.images, ...uploadedUrls];
        console.log('Novo estado de imagens:', newImages);
        return {
          ...prev,
          images: newImages,
        };
      });

      // Limpar as URLs de prévia após o upload
      newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewImages([]);
    } catch (error) {
      console.error('Erro ao processar imagens:', error);
      alert('Erro ao fazer upload das imagens. Por favor, tente novamente.');
      // Limpar as URLs de prévia em caso de erro
      newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewImages([]);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleImageError = (index) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
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
            <div className="mt-1">
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Adicionar Imagens
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={uploadingImages}
                  />
                </label>
                {uploadingImages && (
                  <span className="text-sm text-gray-500">
                    Enviando imagens...
                  </span>
                )}
              </div>
            </div>

            {/* Prévia das novas imagens */}
            {previewImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Prévia das Novas Imagens
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {previewImages.map((previewUrl, index) => (
                    <div key={`preview-${index}`} className="relative">
                      <img
                        src={previewUrl}
                        alt={`Prévia ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">Enviando...</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Imagens existentes */}
            {formData.images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Imagens Atuais
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      {!imageError[index] ? (
                        <img
                          src={
                            image.startsWith('http')
                              ? image
                              : `${CLOUDINARY_BASE_URL}${image}`
                          }
                          alt={`Imagem ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                          onError={() => handleImageError(index)}
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            Imagem não disponível
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
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
