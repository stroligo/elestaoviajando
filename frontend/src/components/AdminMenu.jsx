import { Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export function AdminMenu() {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
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
      component: 'dashboard',
    },
    {
      title: 'Gerenciar Viagens',
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
      component: 'trips',
    },
    {
      title: 'Gerenciar Blog',
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
      component: 'blog',
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-dark mb-2">
          Menu Administrativo
        </h2>
        <p className="text-sm text-gray-light">Bem-vindo, {user?.name}</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('changeComponent', {
                      detail: item.component,
                    }),
                  )
                }
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-dark hover:bg-gray-extralight rounded-lg transition-colors"
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          </li>
        </ul>
      </nav>
    </div>
  );
}
