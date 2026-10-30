import { cn } from '../../utils/cn.js';

/**
 * Progress bar with percentage completion.
 */
export function ProgressBar({ current = 0, total = 0, className = '' }) {
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      className={cn(
        'w-full bg-surface-2 rounded-full h-2 overflow-hidden border border-border/50',
        className,
      )}
    >
      <div
        className="bg-primary h-full transition-all duration-300 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
