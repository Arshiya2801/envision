/**
 * Root application component showing dark theme container.
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-bg text-text">
      <div className="max-w-md w-full bg-surface border border-border rounded-xl p-8 text-center shadow-lg">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 text-primary mb-4 font-bold text-xl">
          E
        </div>
        <h1 className="text-2xl font-semibold mb-2">EnvisionStudio</h1>
        <p className="text-sm text-muted">Project Management Dashboard</p>
      </div>
    </main>
  );
}
