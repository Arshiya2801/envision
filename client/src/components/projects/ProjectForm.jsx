import { useState, useEffect } from 'react';
import { Input } from '../ui/Input.jsx';
import { Textarea } from '../ui/Textarea.jsx';
import { Select } from '../ui/Select.jsx';
import { Button } from '../ui/Button.jsx';
import { PROJECT_STATUSES } from '../../utils/constants.js';
import { toDateInput } from '../../utils/dates.js';

/**
 * Shared form component for creating and editing projects.
 */
export function ProjectForm({ project, onSubmit, onCancel, isSaving }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    deadline: '',
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || 'Active',
        deadline: toDateInput(project.deadline) || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Active',
        deadline: '',
      });
    }
    setErrors({});
    setGeneralError('');
  }, [project]);

  const validate = () => {
    const errs = {};
    const trimmedTitle = formData.title.trim();
    if (!trimmedTitle) {
      errs.title = 'Title must be at least 3 characters';
    } else if (trimmedTitle.length < 3) {
      errs.title = 'Title must be at least 3 characters';
    } else if (trimmedTitle.length > 100) {
      errs.title = 'Title must be at most 100 characters';
    }

    if (formData.description && formData.description.trim().length > 1000) {
      errs.description = 'Description must be at most 1000 characters';
    }

    if (!PROJECT_STATUSES.includes(formData.status)) {
      errs.status = 'Status must be Active, Completed or On Hold';
    }

    if (!formData.deadline || !/^\d{4}-\d{2}-\d{2}$/.test(formData.deadline)) {
      errs.deadline = 'Deadline must be a valid date (YYYY-MM-DD)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!validate()) return;

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        deadline: formData.deadline,
      });
    } catch (err) {
      if (err.details && Array.isArray(err.details) && err.details.length > 0) {
        const fieldErrors = {};
        err.details.forEach((d) => {
          if (d.field) fieldErrors[d.field] = d.message;
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      } else {
        setGeneralError(err.message || 'Something went wrong');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {generalError && (
        <div
          role="alert"
          className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs text-danger"
        >
          {generalError}
        </div>
      )}

      <Input
        label="Title"
        required
        value={formData.title}
        error={errors.title}
        placeholder="Website redesign"
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
      />

      <Textarea
        label="Description"
        rows={4}
        value={formData.description}
        error={errors.description}
        placeholder="Brief description of project goals and scope"
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Status"
          required
          value={formData.status}
          error={errors.status}
          options={PROJECT_STATUSES}
          onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
        />

        <Input
          type="date"
          label="Deadline"
          required
          value={formData.deadline}
          error={errors.deadline}
          onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border mt-6">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? 'Saving…' : project ? 'Save changes' : 'Create project'}
        </Button>
      </div>
    </form>
  );
}
