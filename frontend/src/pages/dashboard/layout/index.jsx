import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../Dashboard';
import { Profile } from '../Profile';
import Trips from '../trips';
import TripCreate from '../trips/Create';
import TripEdit from '../trips/Edit';
import Blog from '../blog';
import BlogCreate from '../blog/Create';
import BlogEdit from '../blog/Edit';

export function DashboardLayout() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard setActiveComponent={setActiveComponent} />;
      case 'profile':
        return <Profile />;
      case 'trips':
        return (
          <Trips
            setActiveComponent={setActiveComponent}
            setSelectedTripId={setSelectedTripId}
          />
        );
      case 'trip-create':
        return <TripCreate setActiveComponent={setActiveComponent} />;
      case 'trip-edit':
        return (
          <TripEdit
            setActiveComponent={setActiveComponent}
            selectedTripId={selectedTripId}
          />
        );
      case 'blogs':
        return (
          <Blog
            setActiveComponent={setActiveComponent}
            setSelectedBlogId={setSelectedBlogId}
          />
        );
      case 'blog-create':
        return <BlogCreate setActiveComponent={setActiveComponent} />;
      case 'blog-edit':
        return (
          <BlogEdit
            setActiveComponent={setActiveComponent}
            blogId={selectedBlogId}
          />
        );
      default:
        return <Dashboard setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="bg-zinc-50">
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100  mx-auto container">
        <Sidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <main className="flex-1 md:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
