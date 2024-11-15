import { Link } from 'wouter';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="bg-blue text-white shadow-xl">
      <nav className="container mx-auto">
        <div className="flex justify-between py-6 items-center">
          <div className="text-2xl font-bold">
            <Link href="/">ElesTãoViajando</Link>
          </div>
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
      </nav>
    </header>
  );
}
