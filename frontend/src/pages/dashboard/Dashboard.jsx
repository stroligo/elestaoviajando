import { IntroSection } from '@/components/features/IntroSection';
import PropTypes from 'prop-types';

export function Dashboard({ setActiveComponent }) {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 flex justify-between items-center">
        <IntroSection title="Bem-vindo ao" subtitle="Painel" />

        <p className="text-gray-600 text-lg flex flex-col text-right">
          <span className="font-bold text-4xl text-blue">Painel</span>
          Use o menu lateral para gerenciar o site
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card de Viagens */}
        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-dark">Viagens</h3>
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
          <p className="text-gray-600 mb-6">Gerencie suas viagens e destinos</p>
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
            <h3 className="text-xl font-semibold text-gray-dark">Perfil</h3>
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
            onClick={() => setActiveComponent('profile')}
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
}

Dashboard.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};
