import HomeIntro from '/assets/img/home/intro.jpg';
import { IntroSection } from '../components/features/IntroSection';

export function About() {
  return (
    <article className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
      <section>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="md:w-1/2">
            <figure className=" overflow-hidden rounded-3xl max-h-[200px] md:max-h-[400px]">
              <img src={HomeIntro} className="h-full w-full object-cover" />
            </figure>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="md:px-8">
              <IntroSection title="Que bom ter" subtitle="você aqui" />
              <h6>Prazer, nós somos Layane e Gabriel!</h6>
              <p>
                Um casal de 30 e alguma coisa que, em um ano pandêmico muito
                louco, ainda sem saber o que estava por vir, decidiu construir
                uma campervan para viver viajando dentro dela!
              </p>
              <h6>
                Ter um sonho e ser capaz de finalmente torná-lo realidade é a
                melhor sensação de todos os tempos. Por isso, criamos o Eles Tão
                Viajando!
              </h6>
              <p>
                E porque também, para nós, isso faz mais sentido ainda ao
                podermos compartilhar com você.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
