import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { TripsList } from './trips/List';
import { BlogsList } from './blog/List';

export function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      onClick: () => setActiveComponent('dashboard'),
    },
    {
      label: 'Gerenciar Viagens',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      onClick: () => setActiveComponent('trips'),
    },
    {
      label: 'Gerenciar Blog',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
      onClick: () => setActiveComponent('blogs'),
    },
    {
      label: 'Meu Perfil',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      onClick: () => setLocation('/admin/profile'),
    },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <div className="p-12">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-dark mb-3">
                Bem-vindo, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Use o menu lateral para gerenciar viagens e posts do blog.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card de Viagens */}
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-dark">
                    Viagens
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Gerencie suas viagens e destinos
                </p>
                <button
                  onClick={() => setActiveComponent('trips')}
                  className="text-primary hover:text-blue-dark font-medium flex items-center"
                >
                  Ver viagens
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Card de Blog */}
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-dark">Blog</h3>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <svg
                      className="w-6 h-6 text-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Gerencie os posts do blog</p>
                <button
                  onClick={() => setActiveComponent('blogs')}
                  className="text-primary hover:text-blue-dark font-medium flex items-center"
                >
                  Ver posts
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Card de Perfil */}
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-dark">
                    Perfil
                  </h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Gerencie suas informações pessoais
                </p>
                <button
                  onClick={() => setLocation('/admin/profile')}
                  className="text-primary hover:text-blue-dark font-medium flex items-center"
                >
                  Ver perfil
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      case 'trips':
        return <TripsList />;
      case 'blogs':
        return <BlogsList />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-extralight">
      <div className="w-64 bg-white shadow-lg sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-extralight">
          <h2 className="text-xl font-bold text-gray-dark">Admin</h2>
          <p className="text-sm text-gray-light mt-1">Painel de Controle</p>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full px-6 py-3 text-left flex items-center space-x-3 transition-colors ${
                activeComponent === item.label.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={logout}
            className="w-full px-6 py-3 text-left flex items-center space-x-3 text-red-500 hover:bg-red-50 transition-colors mt-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sair</span>
          </button>
        </nav>
      </div>
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
