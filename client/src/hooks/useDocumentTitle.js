import { useEffect } from 'react';

/**
 * Sets document title with the EnvisionStudio PM suffix.
 * @param {string} title
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · EnvisionStudio PM` : 'EnvisionStudio PM';
  }, [title]);
}
