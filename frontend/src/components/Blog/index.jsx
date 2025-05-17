import { useState, useEffect } from 'react';
import { conectBlogs } from '@/services/api';
import { Slugify } from '@/utils/stringUtils';
import { Filter } from './Filter';
import { IntroSection } from '@/components/features/IntroSection';
import { Pagination } from './Pagination';
import { BlogList } from './List';

export function Blog() {
  const [blog, setBlog] = useState([]);
  const [displayedBlog, setDisplayedBlog] = useState([]);
  const [orderBy, setOrderBy] = useState('desc');
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await conectBlogs();
        setBlog(data);
        setDisplayedBlog(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setError('Não foi possível carregar os posts');
        setBlog([]);
        setDisplayedBlog([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlog();
  }, []);

  const handleFilterChange = (filter) => {
    const filteredBlog = getFilteredBlog(
      blog,
      filter.searchTerm,
      filter.hashtag,
    );
    setDisplayedBlog(filteredBlog);
  };

  const handleOrderByChange = (orderBy) => {
    setOrderBy(orderBy);
    handleFilterChange({ searchTerm: '', hashtag: '' });
  };

  const handleClearFilter = () => {
    setDisplayedBlog(blog);
  };

  const getFilteredBlog = (blog, searchTerm, hashtag) => {
    let filteredBlog = blog;

    if (searchTerm) {
      filteredBlog = filteredBlog.filter((post) =>
        Slugify(post.titulo).includes(Slugify(searchTerm)),
      );
    }

    if (hashtag) {
      filteredBlog = filteredBlog.filter((post) =>
        post.hashtag?.some((tag) => Slugify(tag).includes(Slugify(hashtag))),
      );
    }

    return filteredBlog;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex md:justify-between md:flex-row flex-col md:items-center ">
        <IntroSection title="Blog" subtitle="Eles tao viajando" />

        <Filter
          blog={blog}
          onFilterChange={handleFilterChange}
          onOrderByChange={handleOrderByChange}
          onClearFilter={handleClearFilter}
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
      ) : displayedBlog.length === 0 ? (
        <div className="text-gray">Nenhum post encontrado</div>
      ) : (
        <>
          <BlogList
            blog={displayedBlog}
            orderBy={orderBy}
            page={page}
            pageSize={pageSize}
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            totalBlog={displayedBlog.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
