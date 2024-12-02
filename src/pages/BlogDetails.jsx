import { useState, useEffect } from 'react';
import { getBlog } from '../services/api';
import { useParams } from 'wouter';

import { IntroSection } from '@/components/features/IntroSection';
import { SliderTrip } from '@/components/features/Slider/SliderTrip';

import { DateTrip } from '@/components/ui/DateTrip';

export function BlogDetails() {
  const [location, setLocation] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadViagem() {
      if (id) {
        try {
          const locationData = await getBlog(id);
          setLocation(locationData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
    loadViagem();
  }, [id]);

  return (
    <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
      {location && location.id && (
        <div className=" flex flex-col gap-10 ">
          <div className="w-full flex flex-col lg:flex-row-reverse gap-8 ">
            {/* Slider Header */}
            <div className="relative w-full   lg:w-7/12">
              <div className="sticky top-10 z-50">
                <SliderTrip imagens={location.images} />
                {/*   <div className="absolute top-0 left-0  w-full pt-6 pl-6">
                  <IntroSection subtitle={location.titulo} style="hero" />
                </div> */}
              </div>
            </div>
            {/* Container */}
            <div className="flex flex-col w-full lg:w-5/12  gap-8">
              <article className="bg-gray-extralight relative rounded-md p-6">
                <div className="flex flex-col gap-4 pb-6">
                  <div className="flex flex-col gap-1 pb-4">
                    <IntroSection subtitle={location.titulo} customCss="pb-2" />
                    <DateTrip date={location.date} />
                  </div>
                  <div>
                    {Array.isArray(location.description) &&
                      location.description.length > 0 &&
                      location.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                  <div className="flex gap-2 flex-wrap text-orange">
                    {Array.isArray(location.hashtag) &&
                      location.hashtag.length > 0 &&
                      location.hashtag.map((paragraph, index) => (
                        <span key={index}>{paragraph}</span>
                      ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
