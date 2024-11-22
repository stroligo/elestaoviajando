import { IntroSection } from '../components/features/IntroSection';
import { Trips } from '../components/features/Trips';

export function AllTravels() {
  return (
    <section>
      <div className="flex  flex-col">
        <IntroSection
          title="Todas as"
          subtitle="Viagens"
          customCss="md:items-center"
        />
        <Trips />
      </div>
    </section>
  );
}
