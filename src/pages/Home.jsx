import { Trips } from '../components/features/Trips';
import { Hero } from '../components/features/Hero';

export function Home() {
  return (
    <article className="flex gap-8 flex-col">
      <Hero />
      <section>
        <div>
          <h2>Destaque 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            accusamus quasi est voluptates minus. Minima iusto, tempora vero et
          </p>
        </div>
      </section>
      <section className="bg-orange text-white p-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
        repellendus odio fugit, placeat expedita cumque mollitia dolorem ullam,
        nisi excepturi enim eum, labore voluptate quasi necessitatibus velit
        maxime! Recusandae, quis!
      </section>
      <section>
        <div className="flex  flex-col">
          <h2>Ultimas Viagens</h2>
          <Trips />
        </div>
      </section>
    </article>
  );
}
