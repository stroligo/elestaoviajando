import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { TripsList } from './trips/List';
import { BlogsList } from './blog/List';

export function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: '📊',
      onClick: () => setActiveComponent('dashboard'),
    },
    {
      label: 'Gerenciar Viagens',
      icon: '✈️',
      onClick: () => setActiveComponent('trips'),
    },
    {
      label: 'Gerenciar Blog',
      icon: '📝',
      onClick: () => setActiveComponent('blogs'),
    },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-dark mb-4">
              Bem-vindo, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Use o menu lateral para gerenciar viagens e posts do blog.
            </p>
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
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-dark">Admin</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full px-6 py-3 text-left flex items-center space-x-3 ${
                activeComponent === item.label.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}
