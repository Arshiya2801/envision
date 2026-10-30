export const queryKeys = {
  projects: (status) => ['projects', status ?? 'all'],
  project: (id) => ['project', id],
  tasks: (projectId) => ['tasks', projectId],
  summary: () => ['summary'],
};
