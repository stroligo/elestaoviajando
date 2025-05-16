import { Route, Switch } from 'wouter';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { PageBlog } from '@/pages/PageBlog';
import { BlogDetails } from '@/pages/BlogDetails';
import { TripDetails } from '@/pages/TripDetails';
import { NewLocation } from '@/pages/NewLocation';
import { PageTrips } from '@/pages/PageTrips';
import { PostsPage } from '@/pages/PostsPage';

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />

      <Route path="/blog" component={PageBlog} />
      <Route path="/blog/:id" component={BlogDetails} />

      <Route path="/newlocation" component={NewLocation} />
      <Route path="/trips" component={PageTrips} />
      <Route path="/trips/:city" component={TripDetails} />

      <Route path="/posts" component={PostsPage} />
    </Switch>
  );
}
