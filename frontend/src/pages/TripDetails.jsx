import { useState, useEffect } from 'react';
import { getTrip } from '../services/api';
import { useParams } from 'wouter';
import { MapSingle } from '../components/Map/Trip';
import { IntroSection } from '../components/features/IntroSection';
import { SliderTrip } from '../components/features/Slider/SliderTrip';
import { DateTrip } from '../components/ui/DateTrip';
import { Weather } from '@/components/features/Weather';
import { CLOUDINARY_BASE_URL } from '../utils/cloudinary';

export function TripDetails() {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function loadViagem() {
      if (id) {
        try {
          console.log('ID recebido:', id);
          const locationData = await getTrip(id);
          console.log('Dados da viagem carregados:', locationData);

          if (locationData) {
            // Garantir que as imagens tenham a URL correta
            const processedData = {
              ...locationData,
              images: locationData.images.map((image) =>
                image.startsWith('http')
                  ? image
                  : `${CLOUDINARY_BASE_URL}${image}`,
              ),
            };
            setLocation(processedData);
            setError(null);
          } else {
            console.error('Viagem não encontrada');
            setError('Viagem não encontrada');
            setLocation({});
          }
        } catch (error) {
          console.error('Erro ao carregar viagem:', error);
          setError('Não foi possível carregar a viagem');
          setLocation({});
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadViagem();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0 flex-col">
        <div className="flex justify-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0 flex-col">
        <div className="text-gray">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
      {location && location.city && (
        <div className=" flex flex-col gap-10 ">
          <div className="w-full flex flex-col lg:flex-row-reverse gap-8 ">
            {/* Slider Header */}
            <div className="relative w-full   lg:w-7/12">
              <div className="sticky top-10 z-50">
                <SliderTrip imagens={location.images} />
              </div>
            </div>
            {/* Container */}
            <div className="flex flex-col w-full lg:w-5/12  gap-8">
              <article className="bg-gray-extralight relative rounded-md p-6">
                <div className="flex flex-col gap-4 pb-6">
                  <div className="flex flex-col gap-1 pb-4">
                    <IntroSection
                      title={location.country}
                      subtitle={location.city}
                      customCss="pb-2"
                    />
                    <DateTrip date={location.date} />
                  </div>
                  <div>
                    {Array.isArray(location.description) &&
                      location.description.length > 0 &&
                      location.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </div>
                {/* Clima */}
                {location.coordinates &&
                  location.coordinates.lat &&
                  location.coordinates.lng && (
                    <div>
                      <IntroSection title="Informações" customCss="pb-4" />
                      <Weather
                        lat={location.coordinates.lat}
                        lon={location.coordinates.lng}
                      />
                    </div>
                  )}
              </article>
              {/* Mapa */}
              {location.coordinates &&
                location.coordinates.lat &&
                location.coordinates.lng && (
                  <div className="flex flex-col gap-4">
                    <IntroSection title="Localizacão" customCss="pb-2" />
                    <div>
                      <MapSingle location={location} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
