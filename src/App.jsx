import { Header } from './components/layout/Header';
import { Footer } from './components/Layout/Footer';
import { Main } from './components/layout/Main';

export function App() {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
