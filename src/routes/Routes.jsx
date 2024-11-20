import { Route, Switch } from 'wouter';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Travel } from '../pages/Travel';
import { AllTravels } from '../pages/AllTravels';
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
