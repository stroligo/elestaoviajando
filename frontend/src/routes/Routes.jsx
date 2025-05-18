import { Route, Switch } from 'wouter';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Páginas públicas
import { Home } from '@/pages/Home';
import { PageTrips } from '@/pages/PageTrips';
import { PageBlog } from '@/pages/PageBlog';
import { TripDetails } from '@/pages/TripDetails';
import { BlogDetails } from '@/pages/BlogDetails';
import { About } from '@/pages/About';
import { Login } from '@/pages/Login';

// Páginas administrativas
import { Dashboard } from '@/pages/dashboard';
import { TripsList } from '@/pages/dashboard/trips';
import { CreateTrip } from '@/pages/dashboard/trips/Create';
import { EditTrip } from '@/pages/dashboard/trips/Edit';
import { BlogsList } from '@/pages/dashboard/blog';
import { CreateBlog } from '@/pages/dashboard/blog/Create';
import { EditBlog } from '@/pages/dashboard/blog/Edit';

export function Routes() {
  return (
    <AuthProvider>
      <Switch>
        {/* Rotas públicas */}
        <Route path="/" component={Home} />
        <Route path="/trips" component={PageTrips} />
        <Route path="/trips/:id" component={TripDetails} />
        <Route path="/blog" component={PageBlog} />
        <Route path="/blog/:id" component={BlogDetails} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        {/* Rotas administrativas */}
        <Route path="/dashboard">
          <ProtectedRoute requireAdmin>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/trips">
          <ProtectedRoute requireAdmin>
            <TripsList />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/trips/create">
          <ProtectedRoute requireAdmin>
            <CreateTrip />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/trips/edit/:id">
          <ProtectedRoute requireAdmin>
            <EditTrip />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/blog">
          <ProtectedRoute requireAdmin>
            <BlogsList />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/blog/create">
          <ProtectedRoute requireAdmin>
            <CreateBlog />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/blog/edit/:id">
          <ProtectedRoute requireAdmin>
            <EditBlog />
          </ProtectedRoute>
        </Route>
      </Switch>
    </AuthProvider>
  );
}
