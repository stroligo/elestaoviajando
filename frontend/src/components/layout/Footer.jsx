import { Link } from 'wouter';

import Logo from '/assets/img/logo.png';
import { Button } from '../ui/Button';
import { Svg } from '../ui/Icons';
export function Footer() {
  return (
    <footer className=" bg-orange">
      <div className="container  px-5 md:px-0 mx-auto py-10 text-white">
        <div className="flex justify-between flex-col md:flex-row h-full">
          <div className="p-4 h-full items-center justify-center ">
            <figure className=" flex justify-center items-center">
              <img src={Logo} alt="Logo" className="max-w-40" />
            </figure>
          </div>
          <div className="flex flex-col  md:w-8/12 gap-2   text-blue p-5 rounded-xl items-end ">
            <div className=" p-2 flex justify-center md:justify-between items-center w-full gap-2 md:w-fit ">
              <div className="text-sm  font-semibold">Redes Sociais</div>
              <div className="flex gap-3">
                <Link href="https://www.instagram.com/elestaoviajando">
                  <Svg
                    type="Instagram"
                    color="#41798b"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link href="https://www.facebook.com/elestaoviajando">
                  <Svg type="Facebook" color="#41798b" width={24} height={24} />
                </Link>
                <Link href="https://www.youtube.com/elestaoviajando">
                  <Svg type="YouTube" color="#41798b" width={24} height={24} />
                </Link>
              </div>
            </div>
            <ul className="w-fit flex-1 flex-wrap h-fit flex gap-2 flex-row items-center justify-center">
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
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </ul>
          </div>
        </div>
      </div>
      <div className=" bg-blue-dark">
        <div className="container mx-auto px-5 md:px-0 py-2 text-sm text-white">
          Projeto Desenvolvido por Stroligo
        </div>
      </div>
    </footer>
  );
}
