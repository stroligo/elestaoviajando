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
import { Dashboard } from '@/admin/Dashboard';
import { Profile } from '@/admin/Profile';
import { TripsList } from '@/admin/trips/List';
import { CreateTrip } from '@/admin/trips/Create';
import { EditTrip } from '@/admin/trips/Edit';
import { BlogsList } from '@/admin/blog/List';
import { CreateBlog } from '@/admin/blog/Create';
import { EditBlog } from '@/admin/blog/Edit';

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
        <Route path="/admin">
          <ProtectedRoute requireAdmin>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/profile">
          <ProtectedRoute requireAdmin>
            <Profile />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/trips">
          <ProtectedRoute requireAdmin>
            <TripsList />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/trips/create">
          <ProtectedRoute requireAdmin>
            <CreateTrip />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/trips/edit/:id">
          <ProtectedRoute requireAdmin>
            <EditTrip />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/blog">
          <ProtectedRoute requireAdmin>
            <BlogsList />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/blog/create">
          <ProtectedRoute requireAdmin>
            <CreateBlog />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/blog/edit/:id">
          <ProtectedRoute requireAdmin>
            <EditBlog />
          </ProtectedRoute>
        </Route>
      </Switch>
    </AuthProvider>
  );
}
