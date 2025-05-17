import { Link } from 'wouter';
import { useState } from 'react';
import { Button } from '../ui/Button';
/* import Logo from '/assets/img/logo_header.png'; */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    console.log('Clicado');
    console.log(menuOpen);
  };

  return (
    <header className="bg-blue-white  text-white bg-cover shadow-xl ">
      <nav className="container mx-auto px-5 md:px-0">
        <div className="flex justify-between py-6 items-center">
          <div className="text-2xl font-bold  p-2">
            <Link href="/">
              <div className="text-blue-dark  drop-shadow-nav select-none font-extrabold text-4xl">
                <span className="text-orange">/ </span>ElesTãoViajando
              </div>
            </Link>
          </div>
          {/*   Botao Hamburguer */}
          <div
            className="md:hidden flex bg-blue items-center justify-center w-8 h-8  rounded-full"
            onClick={handleClick}
          >
            {menuOpen ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </div>
          {/*  Menu Desktop */}
          <div className=" gap-4  md:flex hidden">
            <Button>
              <Link href="/trips">Viagens</Link>
            </Button>
            <Button>
              <Link href="/blog">Blog</Link>
            </Button>
            <Button>
              <Link href="/about">Sobre Nós</Link>
            </Button>

            <Button>
              <Link href="/admin">Dashboard</Link>
            </Button>
          </div>
          {/*  Menu Mobile */}
          {menuOpen && (
            <div className="bg-gradient-to-t from-white to-beige absolute top-20 p-10 z-50 left-0 w-full h-full flex flex-col gap-4">
              <Button>
                <Link href="/trips">Viagens</Link>
              </Button>
              <Button>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button>
                <Link href="/about">Sobre Nós</Link>
              </Button>
              <Button>
                <Link href="/newlocation">Novos Locais</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
