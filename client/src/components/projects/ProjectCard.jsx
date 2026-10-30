import { Link } from 'react-router-dom';
import { ProjectStatusBadge } from './ProjectStatusBadge.jsx';
import { formatDate, isOverdue } from '../../utils/dates.js';

/**
 * Mobile project card component (< 768px).
 */
export function ProjectCard({ project, onEdit, onDelete }) {
  const overdue = isOverdue(project.deadline, project.status);

  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="font-semibold text-text hover:text-primary transition-colors text-base"
        >
          {project.title}
        </Link>
        <ProjectStatusBadge status={project.status} />
      </div>

      {project.description && (
        <p className="text-sm text-muted line-clamp-2">{project.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/60">
        <div>
          <span>{formatDate(project.deadline)}</span>
          {overdue && <span className="ml-2 font-medium text-danger">Overdue</span>}
        </div>
        <span>
          {project.completedTaskCount ?? 0}/{project.taskCount ?? 0} done
        </span>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
        <button
          type="button"
          onClick={() => onEdit(project)}
          aria-label={`Edit ${project.title}`}
          className="text-xs px-3 py-1.5 rounded-lg border border-border text-text hover:bg-surface-2 transition-colors flex items-center gap-1.5"
        >
          <svg
            className="w-3.5 h-3.5"
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
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(project)}
          aria-label={`Delete ${project.title}`}
          className="text-xs px-3 py-1.5 rounded-lg border border-border text-danger hover:bg-danger/10 transition-colors flex items-center gap-1.5"
        >
          <svg
            className="w-3.5 h-3.5"
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
          Delete
        </button>
      </div>
    </div>
  );
}
