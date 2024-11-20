import { Route, Switch } from 'wouter';
import { Home } from '../pages/home';
import { About } from '../pages/about';
import { Travel } from '../pages/travel';
import { AllTravels } from '../pages/allTravels';
export function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/trips" component={AllTravels} />
      <Route path="/trips/:id/:city" component={Travel} />
    </Switch>
  );
}
