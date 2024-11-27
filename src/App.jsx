import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Main } from './components/layout/Main';
import { Routes } from './routes/Routes';

/**
 * App component serves as the root component of the application.
 *
 * This component sets up the main layout of the application, including
 * the header, main content area, and footer. It utilizes a flexbox layout
 * to ensure the application occupies the full height of the screen.
 *
 * Components:
 * - Header: Displays the top navigation or branding.
 * - Main: Contains the main content area, where the Routes component manages
 *   the rendering of different pages based on the current route.
 * - Footer: Displays the bottom section of the application.
 *
 * The component ensures that the entire application is rendered with
 * minimal visual artifacts through the use of antialiasing.
 */
export function App() {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Header />
      <Main>
        <Routes />
      </Main>
      <Footer />
    </div>
  );
}
