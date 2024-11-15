import { Header } from './components/layout/Header';
import { Main } from './components/layout/Main';
import { Footer } from './components/layout/Footer';

export function App() {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
