import { Route, Switch } from 'wouter';

import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { ListTravels } from '../pages/ListTravels';
import { Travel } from '../pages/Travel';

export function Main() {
  return (
    <main className="flex-1 flex bg-beige">
      <article className="container mx-auto flex-1  flex flex-col bg-white px-5 py-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/trips" component={ListTravels} />
          <Route path="/trips/:travel" component={Travel} />
        </Switch>
      </article>
    </main>
  );
}
