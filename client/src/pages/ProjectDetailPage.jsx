import { useParams, Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

/**
 * Project detail view page shell.
 */
export default function ProjectDetailPage() {
  const { id } = useParams();
  useDocumentTitle(`Project ${id}`);

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted flex items-center gap-2">
        <Link to="/projects" className="hover:text-text transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-text font-medium">{id}</span>
      </nav>
      <div>
        <h1 className="text-2xl font-semibold text-text">Project Detail</h1>
        <p className="text-sm text-muted mt-1">Project ID: {id}</p>
      </div>
    </div>
  );
}
