import { Hero } from '../features/Hero';

export function About() {
  return (
    <article className="flex gap-8">
      <Hero />
      <section className="text-4xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
        distinctio eligendi cupiditate placeat nesciunt pariatur optio, libero
        consequuntur. Id maxime obcaecati eveniet nam culpa, deleniti voluptatem
        rem quibusdam atque suscipit?
      </section>
    </article>
  );
}
