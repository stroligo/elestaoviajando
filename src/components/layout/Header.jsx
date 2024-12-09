import { Link } from 'wouter';
import { useState } from 'react';
import { Button } from '../ui/Button';
import Logo from '/assets/img/logo_header.png';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    console.log('Clicado');
    console.log(menuOpen);
  };

  return (
    <header className="bg-blue-dark text-white bg-cover shadow-xl ">
      <nav className="container mx-auto px-5 md:px-0">
        <div className="flex justify-between py-6 items-center">
          <div className="text-2xl font-bold">
            <Link href="/">
              <figure className="w-[150px] md:w-[200px] overflow-hidden ">
                <img src={Logo} alt="Logo" className="w-full object-contain " />
              </figure>
            </Link>
          </div>
          <div
            className="md:hidden flex bg-red-500 items-center justify-center w-8 h-8  rounded-full"
            onClick={handleClick}
          >
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
              <Link href="/newlocation">New Location</Link>
            </Button>
          </div>
          {/*  Menu Mobile */}
          {menuOpen && (
            <div className="bg-gradient-to-t from-white to-beige absolute top-20 p-10 z-50 left-0 w-full h-full flex flex-col gap-4">
              <Link href="/trips">
                <Button onClick={handleClick}>Viagens</Button>
              </Link>
              <Link href="/blog">
                <Button onClick={handleClick}>Blog</Button>
              </Link>
              <Link href="/about">
                <Button onClick={handleClick}>Sobre Nós</Button>
              </Link>
              <Link href="/newlocation">
                <Button onClick={handleClick}>New Location</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
