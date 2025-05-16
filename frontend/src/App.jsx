import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Main } from './components/layout/Main';
import { Routes } from './routes/Routes';

export function App() {
  return (
    <div className="flex flex-col min-h-screen antialiased ">
      <Header />
      <Main>
        <Routes />
      </Main>
      <Footer />
    </div>
  );
}
