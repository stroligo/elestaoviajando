import { Route, Switch } from 'wouter';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { PageBlog } from '@/pages/PageBlog';
import { BlogDetails } from '@/pages/BlogDetails';
import { TripDetails } from '@/pages/TripDetails';
import { NewLocation } from '@/pages/NewLocation';
import { PageTrips } from '@/pages/PageTrips';

// Admin Pages
import { Login } from '@/pages/admin/login/Login';
import { TripsList } from '@/pages/admin/trips/List';
import { CreateTrip } from '@/pages/admin/trips/Create';
import { EditTrip } from '@/pages/admin/trips/Edit';
import { BlogsList } from '../pages/admin/blog/List';
import { CreateBlog } from '../pages/admin/blog/Create';
import { EditBlog } from '../pages/admin/blog/Edit';

export function Routes() {
  return (
    <Switch>
      {/* Rotas públicas */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />

      <Route path="/blog" component={PageBlog} />
      <Route path="/blog/:id" component={BlogDetails} />

      <Route path="/newlocation" component={NewLocation} />
      <Route path="/trips" component={PageTrips} />
      <Route path="/trips/:id" component={TripDetails} />

      {/* Rotas administrativas */}
      <Route path="/admin/login" component={Login} />

      {/* Rotas de Trips */}
      <Route path="/admin/trips" component={TripsList} />
      <Route path="/admin/trips/create" component={CreateTrip} />
      <Route path="/admin/trips/edit/:id" component={EditTrip} />

      {/* Rotas de Blog */}
      <Route path="/admin/blog" component={BlogsList} />
      <Route path="/admin/blog/create" component={CreateBlog} />
      <Route path="/admin/blog/edit/:id" component={EditBlog} />
    </Switch>
  );
}
