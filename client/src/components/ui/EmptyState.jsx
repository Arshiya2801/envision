import { Button } from './Button.jsx';

/**
 * Reusable empty state view with optional action button.
 */
export function EmptyState({ title = 'No items found', description, actionLabel, onAction }) {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center border border-dashed border-border bg-surface/50 rounded-xl">
      <div className="w-12 h-12 rounded-full bg-surface-2 text-muted flex items-center justify-center mb-3">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-text mb-1">{title}</h3>
      {description && <p className="text-sm text-muted mb-4 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
