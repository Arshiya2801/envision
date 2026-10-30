import { cn } from '../../utils/cn.js';

const variantColors = {
  info: 'bg-info/15 text-info border-info/20',
  success: 'bg-success/15 text-success border-success/20',
  warning: 'bg-warning/15 text-warning border-warning/20',
  danger: 'bg-danger/15 text-danger border-danger/20',
};

const statusMap = {
  Active: 'info',
  Completed: 'success',
  'On Hold': 'warning',
  Pending: 'info',
  'In Progress': 'warning',
};

/**
 * Reusable Badge component for status indicators.
 */
export function Badge({ variant, status, children, className = '' }) {
  const chosen = variant || (status ? statusMap[status] : 'info') || 'info';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantColors[chosen],
        className,
      )}
    >
      {children || status}
    </span>
  );
}
