import { Badge } from '../ui/Badge.jsx';

/**
 * Renders status badge with appropriate semantic token colors for project status.
 */
export function ProjectStatusBadge({ status, className = '' }) {
  return <Badge status={status} className={className} />;
}
