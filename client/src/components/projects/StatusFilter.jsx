import { PROJECT_STATUSES } from '../../utils/constants.js';
import { cn } from '../../utils/cn.js';

const filters = ['All', ...PROJECT_STATUSES];

/**
 * Segmented control status filter.
 */
export function StatusFilter({ value = '', onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Filter projects by status"
      className="inline-flex p-1 bg-surface-2 border border-border rounded-lg overflow-x-auto max-w-full"
    >
      {filters.map((status) => {
        const isSelected = (status === 'All' && !value) || status === value;
        return (
          <button
            key={status}
            role="radio"
            aria-checked={isSelected}
            type="button"
            onClick={() => onChange(status === 'All' ? '' : status)}
            className={cn(
              'px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isSelected
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-text hover:bg-surface/50',
            )}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
