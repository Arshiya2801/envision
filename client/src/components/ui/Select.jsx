import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable Select dropdown component.
 */
export const Select = forwardRef(function Select(
  { label, error, required, id, options = [], className = '', children, ...props },
  ref,
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text flex items-center gap-1">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={error && selectId ? `${selectId}-error` : undefined}
        className={cn(
          'w-full h-10 px-3 rounded-lg bg-surface-2 border border-border text-text text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 transition-colors',
          error && 'border-danger focus-visible:ring-danger',
          className,
        )}
        {...props}
      >
        {children ||
          options.map((opt) => (
            <option
              key={opt.value ?? opt}
              value={opt.value ?? opt}
              className="bg-surface text-text"
            >
              {opt.label ?? opt}
            </option>
          ))}
      </select>
      {error && (
        <span id={`${selectId}-error`} className="text-xs text-danger">
          {error}
        </span>
      )}
    </div>
  );
});
