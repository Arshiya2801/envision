import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { MobileNav } from './MobileNav.jsx';

/**
 * Main application shell wrapping all pages with sidebar, mobile nav, and centered content container.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />
        <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
