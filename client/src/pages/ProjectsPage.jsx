import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

/**
 * Projects list page shell.
 */
export default function ProjectsPage() {
  useDocumentTitle('Projects');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text">Projects</h1>
          <p className="text-sm text-muted mt-1">Manage all projects</p>
        </div>
      </div>
    </div>
  );
}
