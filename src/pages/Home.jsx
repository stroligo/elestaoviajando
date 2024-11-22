import { Trips } from '../components/features/Trips';
import { Hero } from '../components/features/Hero';
import { Map } from '../components/features/Map';
import HomeIntro from '/assets/img/home/intro.jpg';
import { IntroSection } from '../components/features/IntroSection';
import { BigNumber } from '../components/features/BigNumber';

export function Home() {
  return (
    <article className="flex gap-8 flex-col">
      <Hero />

      {/* Intro */}
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
      {/* BigNumbers */}
      <section>
        <div className="flex  flex-col">
          <IntroSection
            title="Números não dizem muito,"
            subtitle="Mas aqui estão alguns…"
            customCss="md:items-center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <BigNumber
              number={35}
              img="/assets/img/bignumbers/globo.png"
              text="Paises Visitados"
            />
            <BigNumber
              number={250}
              img="/assets/img/bignumbers/calendar.png"
              text="Dias Viajando"
            />
            <BigNumber
              number={800}
              complement={'K'}
              img="/assets/img/bignumbers/camera.png"
              text="Imagens Geradas"
            />
            <BigNumber
              number={100}
              complement={'K'}
              img="/assets/img/bignumbers/flag.png"
              text="KM Percorridos"
            />
          </div>
        </div>
      </section>
      {/* Blog */}
      <section>
        <div className="flex  flex-col">
          <IntroSection
            title="Algumas de"
            subtitle="Nossas histórias"
            customCss="md:items-center"
          />
          <div className="grid grid-cols-4 gap-6">
            <div>Blog 1</div>
            <div>Blog 2</div>
            <div>Blog 3</div>
            <div>Blog 4</div>
          </div>
        </div>
      </section>
      {/*  Ultimas Viagens */}
      <section>
        <div className="flex  flex-col">
          <IntroSection
            title="Nossas ultimas"
            subtitle="Viagens"
            customCss="md:items-center"
          />
          <Trips />
        </div>
      </section>
      {/*  Por onde já passamos Map */}
      <section>
        <div className="flex  flex-col">
          <IntroSection
            title="Por onde"
            subtitle="já passamos"
            customCss="md:items-center"
          />
          <Map />
        </div>
      </section>
      <section>
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/2">
            <IntroSection title="Novidades no" subtitle="Instagram" />
          </div>
          <div className="md:w-1/2">INSTAGRAM WIDGETS</div>
        </div>
      </section>
    </article>
  );
}
