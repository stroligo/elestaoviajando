import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { conectBlogs, deleteBlog } from '@/services/api';

export function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc',
  });

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await conectBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Erro ao carregar blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este blog?')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } catch (error) {
        console.error('Erro ao deletar blog:', error);
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedBlogs = (blogs) => {
    return [...blogs].sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      const valueA = a[sortConfig.key]?.toLowerCase() || '';
      const valueB = b[sortConfig.key]?.toLowerCase() || '';

      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filtrar blogs baseado no termo de busca
  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;

    const tituloMatch = blog.titulo?.toLowerCase().includes(searchLower);
    const hashtagMatch = blog.hashtag?.some((tag) =>
      tag.toLowerCase().includes(searchLower),
    );

    return tituloMatch || hashtagMatch;
  });

  // Resetar para primeira página quando o termo de busca mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calcular paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSortedBlogs(filteredBlogs).slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para gerar os números das páginas
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return (
        <svg
          className="w-4 h-4 ml-1 inline-block text-gray-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg
        className="w-4 h-4 ml-1 inline-block text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 ml-1 inline-block text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Blogs</h1>
        <Link href="/admin/blog/create">
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-dark transition-colors">
            Novo Blog
          </button>
        </Link>
      </div>

      {/* Barra de busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título ou hashtag..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-extralight">
              <thead className="bg-primary">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('titulo')}
                  >
                    Título
                    <SortIcon column="titulo" />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Data
                    <SortIcon column="date" />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-extralight">
                {currentItems.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-extralight">
                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray">
                      {blog.titulo}
                    </td>
                    <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray">
                      {new Date(blog.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="w-1/12 px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <Link href={`/admin/blog/edit/${blog._id}`}>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-brown hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown transition-colors ml-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-light text-gray hover:bg-gray-extralight disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {getPageNumbers().map((number, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof number === 'number' && paginate(number)
                    }
                    disabled={typeof number !== 'number'}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? 'bg-primary text-white'
                        : 'border border-gray-light text-gray hover:bg-gray-extralight'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-light text-gray hover:bg-gray-extralight disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
