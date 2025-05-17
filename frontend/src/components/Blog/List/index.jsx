// BlogList.js
import { Link } from 'wouter';
import { Card } from '@/components/ui/Card';
import PropTypes from 'prop-types';

export function BlogList({ blog, orderBy, page, pageSize }) {
  const sortedBlog = blog.sort((a, b) => {
    if (orderBy === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const paginatedBlog = sortedBlog.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  if (paginatedBlog.length === 0) {
    return <div>Nenhum post encontrado</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {paginatedBlog.map((item) => (
        <Link key={item.id} to={`/blog/${item.id}`}>
          <Card location={item} />
        </Link>
      ))}
    </div>
  );
}

BlogList.propTypes = {
  blog: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};
