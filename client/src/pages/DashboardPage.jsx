import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

/**
 * Dashboard page shell.
 */
export default function DashboardPage() {
  useDocumentTitle('Dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Overview of all projects and tasks</p>
      </div>
    </div>
  );
}
