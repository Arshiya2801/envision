import { useRef, useEffect } from 'react';
import { Modal } from './Modal.jsx';
import { Button } from './Button.jsx';

/**
 * Confirmation dialog for destructive actions (focuses Cancel first).
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  confirmText = 'Delete',
  isLoading = false,
}) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => cancelBtnRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm text-muted mb-6 leading-relaxed">{body}</p>
      <div className="flex items-center justify-end gap-3">
        <Button
          ref={cancelBtnRef}
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting…' : confirmText}
        </Button>
      </div>
    </Modal>
  );
}
