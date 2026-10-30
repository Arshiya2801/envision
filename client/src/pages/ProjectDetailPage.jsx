import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useProject, useUpdateProject, useDeleteProject } from '../hooks/useProjects.js';
import { ProjectStatusBadge } from '../components/projects/ProjectStatusBadge.jsx';
import { ProjectForm } from '../components/projects/ProjectForm.jsx';
import { ProgressBar } from '../components/ui/ProgressBar.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { ConfirmDialog } from '../components/ui/ConfirmDialog.jsx';
import { Skeleton } from '../components/ui/Skeleton.jsx';
import { ErrorState } from '../components/ui/ErrorState.jsx';
import { SlowServerNotice } from '../components/ui/SlowServerNotice.jsx';
import { formatDate, isOverdue } from '../utils/dates.js';

/**
 * Project Detail page showing header, info card, and task progress (tasks section in Phase 6).
 */
export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading, error, refetch } = useProject(id);
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useDocumentTitle(project?.title ? project.title : 'Project');

  const handleUpdate = async (formData) => {
    await updateMutation.mutateAsync({ id, body: formData });
    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/projects');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <SlowServerNotice isLoading={isLoading} />
      </div>
    );
  }

  if (error || !project) {
    const is404 = error?.status === 404 || error?.message === 'Project not found';
    return (
      <div className="space-y-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted flex items-center gap-2">
          <Link to="/projects" className="hover:text-text transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-text font-medium">Not found</span>
        </nav>
        <ErrorState
          title={is404 ? 'Project not found' : "Couldn't load this project"}
          message={
            is404
              ? 'The project you are looking for does not exist or has been deleted.'
              : error?.message
          }
          onRetry={is404 ? () => navigate('/projects') : () => refetch()}
        />
        {is404 && (
          <div className="text-center mt-2">
            <Link to="/projects">
              <Button variant="secondary">Back to projects</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  const overdue = isOverdue(project.deadline, project.status);
  const taskCount = project.taskCount ?? 0;
  const completedTaskCount = project.completedTaskCount ?? 0;
  const progressPercent = taskCount > 0 ? Math.round((completedTaskCount / taskCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted flex items-center gap-2">
        <Link to="/projects" className="hover:text-text transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-text font-medium truncate max-w-xs">{project.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-semibold text-text">{project.title}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <div>
          <span className="text-xs uppercase font-semibold text-muted tracking-wider block mb-1">
            Description
          </span>
          <p className="text-sm text-text leading-relaxed whitespace-pre-wrap">
            {project.description || 'No description'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <span className="text-xs uppercase font-semibold text-muted tracking-wider block mb-1">
              Deadline
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text">{formatDate(project.deadline)}</span>
              {overdue && <span className="text-xs font-medium text-danger">Overdue</span>}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase font-semibold text-muted tracking-wider block mb-1">
              Created
            </span>
            <span className="text-sm text-muted">
              {project.createdAt ? formatDate(project.createdAt) : '—'}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-semibold text-muted tracking-wider block mb-1">
              Last updated
            </span>
            <span className="text-sm text-muted">
              {project.updatedAt ? formatDate(project.updatedAt) : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text">Progress</span>
          <span className="text-muted text-xs">
            {completedTaskCount} of {taskCount} tasks done ({progressPercent}%)
          </span>
        </div>
        <ProgressBar current={completedTaskCount} total={taskCount} />
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit project">
        <ProjectForm
          project={project}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
          isSaving={updateMutation.isPending}
        />
      </Modal>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete project?"
        body={`‘${project.title}’ and its ${taskCount} tasks will be deleted. This can't be undone.`}
        confirmText="Delete project"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
