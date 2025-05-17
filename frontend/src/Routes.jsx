import { Route, Switch } from 'wouter';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Páginas públicas
import { Home } from '@/pages/Home';
import { PageTrips } from '@/pages/PageTrips';
import { PageBlog } from '@/pages/PageBlog';
import { TripDetails } from '@/pages/TripDetails';
import { BlogDetails } from '@/pages/BlogDetails';
import { Login } from '@/pages/Login';

// Páginas administrativas
import { AdminTripsList } from '@/pages/admin/trips/List';
import { AdminTripsCreate } from '@/pages/admin/trips/Create';
import { AdminTripsEdit } from '@/pages/admin/trips/Edit';
import { AdminBlogsList } from '@/pages/admin/blog/List';
import { AdminBlogsCreate } from '@/pages/admin/blog/Create';
import { AdminBlogsEdit } from '@/pages/admin/blog/Edit';

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

        {/* Rotas administrativas */}
        <Route path="/admin/trips">
          <ProtectedRoute requireAdmin>
            <AdminTripsList />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/trips/create">
          <ProtectedRoute requireAdmin>
            <AdminTripsCreate />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/trips/edit/:id">
          <ProtectedRoute requireAdmin>
            <AdminTripsEdit />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/blog">
          <ProtectedRoute requireAdmin>
            <AdminBlogsList />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/blog/create">
          <ProtectedRoute requireAdmin>
            <AdminBlogsCreate />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/blog/edit/:id">
          <ProtectedRoute requireAdmin>
            <AdminBlogsEdit />
          </ProtectedRoute>
        </Route>
      </Switch>
    </AuthProvider>
  );
}
