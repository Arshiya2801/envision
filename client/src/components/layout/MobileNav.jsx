import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
];

/**
 * Mobile top navigation bar and drop-down menu (< 1024px).
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden bg-surface border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 h-16">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold text-base">
            E
          </div>
          <span className="font-semibold text-text text-base">EnvisionStudio</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="p-2 text-muted hover:text-text rounded-lg hover:bg-surface-2 transition-colors"
        >
          {isOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          className="border-t border-border px-4 py-3 flex flex-col gap-1.5 bg-surface animate-in fade-in slide-in-from-top-1 duration-150"
          aria-label="Mobile Navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/15 text-primary font-semibold'
                    : 'text-muted hover:text-text hover:bg-surface-2',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
