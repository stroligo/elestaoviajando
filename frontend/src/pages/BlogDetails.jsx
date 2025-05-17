import { useState, useEffect } from 'react';
import { getBlog } from '../services/api';
import { useParams } from 'wouter';

import { IntroSection } from '@/components/features/IntroSection';
import { SliderTrip } from '@/components/features/Slider/SliderTrip';

import { DateTrip } from '@/components/ui/DateTrip';

export function BlogDetails() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    async function loadPost() {
      if (slug) {
        try {
          const postData = await getBlog(slug);
          setPost(postData);
          setError(null);
        } catch (error) {
          console.error('Erro ao carregar post:', error);
          setError('Não foi possível carregar o post');
          setPost({});
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadPost();
  }, [slug]);

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
    <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0 flex-col">
      {post && post._id && (
        <div className="flex flex-col gap-10">
          <div className="w-full flex flex-col lg:flex-row-reverse gap-8">
            {/* Slider Header */}
            <div className="relative w-full lg:w-7/12">
              <div className="sticky top-10 z-50">
                {post.images && post.images.length > 0 && (
                  <SliderTrip imagens={post.images} />
                )}
              </div>
            </div>
            {/* Container */}
            <div className="flex flex-col w-full lg:w-5/12 gap-8">
              <article className="bg-gray-extralight relative rounded-md p-6">
                <div className="flex flex-col gap-4 pb-6">
                  <div className="flex flex-col gap-1 pb-4">
                    <IntroSection subtitle={post.title} customCss="pb-2" />
                    <DateTrip date={post.date} />
                  </div>
                  <div>
                    {Array.isArray(post.content) &&
                      post.content.length > 0 &&
                      post.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                  <div className="flex gap-2 flex-wrap text-orange">
                    {Array.isArray(post.hashtag) &&
                      post.hashtag.length > 0 &&
                      post.hashtag.map((tag, index) => (
                        <span key={index}>#{tag}</span>
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
// BlogDetails.jsx
