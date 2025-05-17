import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Verificar se há um token salvo
    const token = localStorage.getItem('token');
    if (token) {
      // Buscar dados do usuário
      fetch('https://elestaoviajando.onrender.com/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok && data.user) {
            setUser(data.user);
          } else {
            console.error('Erro ao validar token:', data);
            localStorage.removeItem('token');
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Erro ao validar token:', error);
          localStorage.removeItem('token');
          navigate('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        'https://elestaoviajando.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      if (!data.token) {
        throw new Error('Token não recebido do servidor');
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/admin');
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
