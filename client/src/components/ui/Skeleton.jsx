import { cn } from '../../utils/cn.js';

/**
 * Skeleton loading placeholder.
 */
export function Skeleton({ className = '' }) {
  return (
    <div aria-hidden="true" className={cn('animate-pulse bg-surface-2/80 rounded-lg', className)} />
  );
}
