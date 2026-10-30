import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projects.js';
import { queryKeys } from './queryKeys.js';

/**
 * Hook to fetch projects optionally filtered by status.
 * @param {string} [status]
 */
export function useProjects(status) {
  return useQuery({
    queryKey: queryKeys.projects(status),
    queryFn: () => getProjects(status),
  });
}

/**
 * Hook to fetch a single project by id.
 * @param {string} id
 */
export function useProject(id) {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => getProject(id),
    enabled: Boolean(id),
  });
}

/**
 * Hook to create a new project.
 */
export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => createProject(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: queryKeys.summary() });
      toast.success('Project created');
    },
    onError: (e) => toast.error(e.message),
  });
}

/**
 * Hook to update an existing project.
 */
export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => updateProject(id, body),
    onSuccess: (project) => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: queryKeys.project(project.id) });
      qc.invalidateQueries({ queryKey: queryKeys.summary() });
      toast.success('Project updated');
    },
    onError: (e) => toast.error(e.message),
  });
}

/**
 * Hook to delete a project.
 */
export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: queryKeys.summary() });
      toast.success('Project deleted');
    },
    onError: (e) => toast.error(e.message),
  });
}
