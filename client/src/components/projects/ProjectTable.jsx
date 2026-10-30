import { Link } from 'react-router-dom';
import { ProjectStatusBadge } from './ProjectStatusBadge.jsx';
import { formatDate, isOverdue } from '../../utils/dates.js';

/**
 * Projects table component for desktop/tablet screens (>= 768px).
 */
export function ProjectTable({ projects, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto border border-border rounded-xl bg-surface">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2/40 text-muted text-xs uppercase font-semibold">
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Title
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Status
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Deadline
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold">
              Tasks
            </th>
            <th scope="col" className="py-3.5 px-4 font-semibold text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((p) => {
            const overdue = isOverdue(p.deadline, p.status);
            return (
              <tr key={p.id} className="hover:bg-surface-2/30 transition-colors">
                <td className="py-4 px-4 max-w-[280px]">
                  <Link
                    to={`/projects/${p.id}`}
                    className="font-medium text-text hover:text-primary transition-colors block truncate"
                  >
                    {p.title}
                  </Link>
                  {p.description && (
                    <span className="text-xs text-muted block truncate mt-0.5">
                      {p.description}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <ProjectStatusBadge status={p.status} />
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="text-text">{formatDate(p.deadline)}</span>
                  {overdue && (
                    <span className="ml-2 text-xs font-medium text-danger inline-flex items-center">
                      Overdue
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-muted text-xs">
                  {p.completedTaskCount ?? 0}/{p.taskCount ?? 0} done
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(p)}
                      aria-label={`Edit ${p.title}`}
                      className="p-1.5 text-muted hover:text-text rounded-lg hover:bg-surface-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p)}
                      aria-label={`Delete ${p.title}`}
                      className="p-1.5 text-muted hover:text-danger rounded-lg hover:bg-surface-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
