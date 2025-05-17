import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'wouter';
import Style from './style.module.css';

import { conectBlogs } from '@/services/api';
import { IntroSection } from '@/components/features/IntroSection';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function SliderLastBlog() {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadViagens() {
      try {
        const data = await conectBlogs();
        const sortedBlog = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setBlog(sortedBlog);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar blogs:', error);
        setError('Não foi possível carregar os blogs');
        setBlog([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadViagens();
  }, []);

  const options = {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    pagination: false,
    autoplay: true,
    interval: 3000,
    speed: 1000,
    easing: 'ease-in-out',
    with: '100%',
    breakpoints: {
      640: {
        fixedWidth: '60%',
      },
    },
  };

  return (
    <div className="flex flex-col gap-10 py-12 items-center justify-center">
      <div className="container mx-auto px-5">
        <IntroSection
          title="Nosso Blog"
          subtitle="Vida na estrada"
          customCss="md:items-center"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-gray">{error}</div>
      ) : blog.length === 0 ? (
        <div className="text-gray">Nenhum blog encontrado</div>
      ) : (
        <Splide options={options} className={Style.splide} autoPlay={true}>
          {blog.slice(0, 20).map((location) => (
            <SplideSlide
              key={location._id || location.id}
              className={Style.splide__slide}
            >
              <Link to={`/blog/${location._id || location.id}`}>
                <div>
                  <Card location={location} />
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      )}

      <div className="container mx-auto px-5">
        <div className="flex justify-center">
          <Link href="/blog">
            <Button>Ver todos os blogs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
