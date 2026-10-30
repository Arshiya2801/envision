import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const variantClasses = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-sm',
  secondary: 'border border-border bg-surface-2 hover:bg-surface text-text',
  danger: 'bg-danger hover:bg-danger/90 text-white shadow-sm',
  ghost: 'text-muted hover:text-text hover:bg-surface-2',
};

/**
 * Reusable Button component styled with dark tokens.
 */
export const Button = forwardRef(function Button(
  { variant = 'primary', className = '', disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium text-sm h-9 px-4 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant] || variantClasses.primary,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
