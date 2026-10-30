import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

/**
 * Reusable Textarea component with label and error display.
 */
export const Textarea = forwardRef(function Textarea(
  { label, error, required, id, rows = 4, className = '', ...props },
  ref,
) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-text flex items-center gap-1"
        >
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
        className={cn(
          'w-full p-3 rounded-lg bg-surface-2 border border-border text-text placeholder:text-muted/60 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 transition-colors resize-y',
          error && 'border-danger focus-visible:ring-danger',
          className,
        )}
        {...props}
      />
      {error && (
        <span id={`${textareaId}-error`} className="text-xs text-danger">
          {error}
        </span>
      )}
    </div>
  );
});
