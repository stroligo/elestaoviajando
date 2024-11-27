import { Route, Switch } from 'wouter';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Blog } from '../pages/Blog';
import { Travel } from '../pages/Travel';
import { AllTravels } from '../pages/AllTravels';
import { NewLocation } from '../pages/NewLocation';
/**
 * Renders all application routes.
 *
 * Routes:
 * - Home: /
 * - About: /about
 * - Blog: /blog
 * - NewLocation: /newlocation
 * - All travels: /trips
 * - Travel: /trips/:city (e.g. /trips/rio-de-janeiro)
 */
export function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/newlocation" component={NewLocation} />
      <Route path="/trips" component={AllTravels} />
      <Route path="/trips/:city" component={Travel} />
    </Switch>
  );
}
