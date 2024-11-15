import { Link } from 'wouter';
import Logo from '/assets/img/logo.png';
import { Button } from '../ui/Button';
export function Footer() {
  return (
    <>
      <footer className="bg-green">
        <div className="container mx-auto py-5 text-white">
          <div className="flex justify-between">
            <figure className="w-24">
              <img src={Logo} alt="Logo" />
            </figure>
            <ul className="flex gap-4">
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
                <Link href="/trips/travel">Travel1</Link>
              </Button>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" bg-blue-dark">
        <div className="container mx-auto py-2 text-sm text-white">
          Projeto Desenvolvido por Stroligo
        </div>
      </div>
    </>
  );
}
