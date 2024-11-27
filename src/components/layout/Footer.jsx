import { Link } from 'wouter';

import Logo from '/assets/img/logo.png';
import { Button } from '../ui/Button';
export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-orange to-yellow">
      <div className="container mx-auto py-10 text-white">
        <div className="flex justify-between">
          <figure className="w-40">
            <img src={Logo} alt="Logo" />
          </figure>
          <div className="flex flex-row gap-8">
            <div>
              <h6>Redes Sociais</h6>
            </div>
            <ul className="flex gap-2 flex-col">
              <Button>
                <Link href="/">Home</Link>
              </Button>
              <Button>
                <Link href="/about">About</Link>
              </Button>
              <Button>
                <Link href="/trips">Trips</Link>
              </Button>
              <Button>
                <Link href="/newlocations">New Location</Link>
              </Button>
            </ul>
          </div>
        </div>
      </div>
      <div className=" bg-blue-dark">
        <div className="container mx-auto py-2 text-sm text-white">
          Projeto Desenvolvido por Stroligo
        </div>
      </div>
    </footer>
  );
}
