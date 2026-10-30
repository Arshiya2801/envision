import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from '../hooks/useProjects.js';
import { StatusFilter } from '../components/projects/StatusFilter.jsx';
import { ProjectTable } from '../components/projects/ProjectTable.jsx';
import { ProjectCard } from '../components/projects/ProjectCard.jsx';
import { ProjectForm } from '../components/projects/ProjectForm.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { ConfirmDialog } from '../components/ui/ConfirmDialog.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Skeleton } from '../components/ui/Skeleton.jsx';
import { ErrorState } from '../components/ui/ErrorState.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { SlowServerNotice } from '../components/ui/SlowServerNotice.jsx';

/**
 * Projects Page showing status filter, table on desktop, cards on mobile, and CRUD modals.
 */
export default function ProjectsPage() {
  useDocumentTitle('Projects');

  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || '';

  const { data: projects, isLoading, error, refetch } = useProjects(statusFilter);

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  const handleFilterChange = (newStatus) => {
    if (newStatus) {
      setSearchParams({ status: newStatus });
    } else {
      setSearchParams({});
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editingProject) {
      await updateMutation.mutateAsync({ id: editingProject.id, body: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    handleCloseForm();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProject) return;
    await deleteMutation.mutateAsync(deletingProject.id);
    setDeletingProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-text">Projects</h1>
            {!isLoading && projects && (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-surface-2 text-muted border border-border">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </span>
            )}
          </div>
          <p className="text-sm text-muted mt-1">Manage and track your projects</p>
        </div>

        <Button type="button" variant="primary" onClick={handleOpenCreate}>
          New project
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <StatusFilter value={statusFilter} onChange={handleFilterChange} />
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <SlowServerNotice isLoading={isLoading} />
        </div>
      )}

      {error && !isLoading && (
        <ErrorState
          title="Couldn't load projects"
          message={error.message}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !error && projects && projects.length === 0 && (
        <EmptyState
          title={statusFilter ? `No ${statusFilter} projects` : 'No projects yet'}
          description={
            statusFilter
              ? 'Try selecting a different status filter or clear the filter.'
              : 'Create your first project to start managing tasks and tracking deadlines.'
          }
          actionLabel={statusFilter ? 'Clear filter' : 'New project'}
          onAction={statusFilter ? () => handleFilterChange('') : handleOpenCreate}
        />
      )}

      {!isLoading && !error && projects && projects.length > 0 && (
        <>
          <div className="hidden md:block">
            <ProjectTable
              projects={projects}
              onEdit={handleOpenEdit}
              onDelete={setDeletingProject}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleOpenEdit}
                onDelete={setDeletingProject}
              />
            ))}
          </div>
        </>
      )}

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingProject ? 'Edit project' : 'New project'}
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          isSaving={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingProject)}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete project?"
        body={`‘${deletingProject?.title}’ and its ${deletingProject?.taskCount ?? 0} tasks will be deleted. This can't be undone.`}
        confirmText="Delete project"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
