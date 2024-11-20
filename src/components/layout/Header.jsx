import { Link } from 'wouter';
import { Button } from '../ui/Button';
import Logo from '/assets/img/logo_header.png';

export function Header() {
  return (
    <header className="bg-blue text-white bg-cover shadow-xl ">
      <nav className="container mx-auto">
        <div className="flex justify-between py-6 items-center">
          <div className="text-2xl font-bold">
            <Link href="/">
              <figure className="w-[230px] overflow-hidden ">
                <img src={Logo} alt="Logo" className="w-full object-contain " />
              </figure>
            </Link>
          </div>
          <ul className="flex gap-4">
            <Button>
              <Link href="/">Home</Link>
            </Button>

            <Button>
              <Link href="/trips">Trips</Link>
            </Button>
            <Button>
              <Link href="/about">About</Link>
            </Button>
          </ul>
        </div>
      </nav>
    </header>
  );
}
