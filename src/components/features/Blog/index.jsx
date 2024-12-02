import { useState, useEffect } from 'react';
import { conectData } from '../../../services/api';
import { Slugify } from '../../utils/stringUtils';
import { Filter } from './Filter';
import { IntroSection } from '../IntroSection';
import { Pagination } from './Pagination';
import { BlogList } from './List';

export function Blog() {
  const [blog, setBlog] = useState([]);
  const [displayedBlog, setDisplayedBlog] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);

  useEffect(() => {
    async function loadBlog() {
      const data = await conectData();
      setBlog(data.blog);
      setDisplayedBlog(data.blog);
    }
    loadBlog();
  }, []);

  const handleFilterChange = (filter) => {
    const filteredBlog = getFilteredBlog(
      blog,
      filter.filterCountry,
      filter.searchTerm,
    );
    setDisplayedBlog(filteredBlog);
  };

  const handleOrderByChange = (orderBy) => {
    setOrderBy(orderBy);
    handleFilterChange({ filterCountry: '', searchTerm: '' });
  };

  const handleClearFilter = () => {
    setDisplayedBlog(blog);
  };

  const getFilteredBlog = (blog, filterCountry, searchTerm) => {
    const filteredBlog = filterCountry
      ? blog.filter((trip) => trip.country === filterCountry)
      : blog;

    return searchTerm
      ? filteredBlog.filter((trip) =>
          Slugify(trip.titulo).includes(Slugify(searchTerm)),
        )
      : filteredBlog;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex md:justify-between md:flex-row flex-col md:items-center ">
        <IntroSection title="Blog" subtitle="Elestaoviajando" />

        <Filter
          blog={blog}
          onFilterChange={handleFilterChange}
          onOrderByChange={handleOrderByChange}
          onClearFilter={handleClearFilter}
        />
      </div>
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
    </div>
  );
}
