import { useState, useEffect } from 'react';

/**
 * Notice displayed after 5 seconds of slow query loading (Render free tier wake up notice).
 */
export function SlowServerNotice({ isLoading }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      role="status"
      className="mt-4 p-3 bg-surface-2 border border-border text-xs text-muted rounded-lg text-center animate-in fade-in duration-300"
    >
      Waking up the server, this can take up to a minute on the free plan.
    </div>
  );
}
