import { Link } from 'wouter';

import Logo from '/assets/img/logo.png';
import { Button } from '../ui/Button';
export function Footer() {
  return (
    <footer className=" bg-orange">
      <div className="container mx-auto py-10 text-white">
        <div className="flex justify-between flex-col md:flex-row h-full">
          <div className="p-4 h-full items-center justify-center ">
            <figure className=" bg-orange">
              <img src={Logo} alt="Logo" className="max-w-40" />
            </figure>
          </div>
          <div className="flex flex-row gap-8 md:w-4/12 bg-blue-dark text-white p-5 rounded-xl pa">
            <div className="">
              <div className="text-xl font-semibold mb-2">Redes Sociais</div>
              <div>
                Ter um sonho e ser capaz de finalmente torná-lo realidade é a
                melhor sensação de todos os tempos. E, para nós, isso faz mais
                sentido ainda ao podermos compartilhar com você.
              </div>
            </div>
            <ul className="w-fit flex-1 flex gap-2 flex-col">
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
