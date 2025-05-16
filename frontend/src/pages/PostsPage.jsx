import { useState, useEffect } from 'react';

export function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://elestaoviajando.onrender.com/api/posts',
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar os posts: {error.message}</p>;

  return (
    <article className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
      <div className="p-4 bg-red-600">
        <h1 className="text-xl font-bold mb-4">Posts</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h2 className="text-lg font-bold">{post.titulo}</h2>
            <p>Data: {post.date}</p>
            <p>Tags: {post.tags && post.tags.join(', ')}</p>
            <p>Descrição:</p>
            {post.description && (
              <ul>
                {post.description.map((descricao, index) => (
                  <li key={index}>{descricao}</li>
                ))}
              </ul>
            )}
            <p>Hashtags: {post.hashtag && post.hashtag.join(', ')}</p>
            <img src={post.thumbnail} alt={post.titulo} />
          </div>
        ))}
      </div>
    </article>
  );
}
