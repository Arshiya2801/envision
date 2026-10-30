import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { Button } from '../components/ui/Button.jsx';

/**
 * 404 Not Found page.
 */
export default function NotFoundPage() {
  useDocumentTitle('Not found');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-surface-2 text-primary flex items-center justify-center font-bold text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl font-semibold text-text mb-2">Page not found</h1>
      <p className="text-sm text-muted mb-6 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Go to dashboard</Button>
      </Link>
    </div>
  );
}
