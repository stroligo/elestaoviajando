import { Hero } from '../components/features/Hero';
import { MapGlobal } from '../components/Map/Global';
import HomeIntro from '/assets/img/home/intro.jpg';
import { IntroSection } from '../components/features/IntroSection';
import { BigNumber } from '../components/features/BigNumber';
import { SliderLastTrip } from '../components/features/Slider/SliderLastTrip';
import { SliderLastBlog } from '@/components/features/Slider/SliderLastBlog';

export function Home() {
  const dataInicioViagem = new Date(2021, 6, 1);
  const dataAtual = new Date();
  const diasViajados = Math.floor(
    (dataAtual - dataInicioViagem) / (1000 * 60 * 60 * 24),
  );
  const paisesViajados = 35;
  const imagensGeradas = 80;
  const kmPercorridos = 120;

  return (
    <article className="flex gap-8 flex-col ">
      <Hero />
      {/* Intro */}
      <section>
        <div className="container mx-auto px-5 md:px-0 flex flex-col md:flex-row gap-4 md:gap-8">
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

      {/*  Ultimas Viagens */}
      <section>
        <div className="flex  flex-col">
          <SliderLastTrip />
        </div>
      </section>
      {/*  Por onde já passamos Map */}
      <section>
        <div className="flex flex-col">
          <div className="container mx-auto px-5 md:px-0">
            <IntroSection
              title="Por onde"
              subtitle="já passamos"
              customCss="md:items-center"
            />
          </div>
          <MapGlobal />
        </div>
      </section>
      {/* BigNumbers */}
      <section>
        <div className="container mx-auto h-[30vh] pb-20 justify-center items-center px-5 md:px-0 flex  flex-col">
          <IntroSection
            title="Números não dizem muito,"
            subtitle="Mas aqui estão alguns…"
            customCss="md:items-center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <BigNumber
              number={paisesViajados}
              img="/assets/img/bignumbers/globo.png"
              text="Paises Visitados"
            />
            <BigNumber
              number={diasViajados}
              img="/assets/img/bignumbers/calendar.png"
              text="Dias Viajando"
            />
            <BigNumber
              number={imagensGeradas}
              complement={'K'}
              img="/assets/img/bignumbers/camera.png"
              text="Imagens Geradas"
            />
            <BigNumber
              number={kmPercorridos}
              complement={'K'}
              img="/assets/img/bignumbers/flag.png"
              text="KM Percorridos"
            />
          </div>
        </div>
      </section>
      {/* Blog */}
      <section className="bg-gray-extralight">
        <div className="flex  flex-col">
          <SliderLastBlog />
        </div>
      </section>
    </article>
  );
}
