import { Button } from './Button.jsx';

/**
 * Reusable error state with Try again action.
 */
export function ErrorState({ title = "Couldn't load data", message, onRetry }) {
  return (
    <div
      role="alert"
      className="p-8 text-center flex flex-col items-center justify-center border border-danger/20 bg-danger/5 rounded-xl max-w-lg mx-auto"
    >
      <div className="w-12 h-12 rounded-full bg-danger/15 text-danger flex items-center justify-center mb-3">
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
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
      {message && <p className="text-sm text-muted mb-4 max-w-sm">{message}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
