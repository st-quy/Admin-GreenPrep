import { useState, useCallback } from 'react';

interface UseConfirmDialogReturn {
  isOpen: boolean;
  selectedId: string | null;
  openDialog: (id: string) => void;
  closeDialog: () => void;
  confirmAction: () => Promise<void>;
  setConfirmAction: (action: () => Promise<void>) => void;
}

export const useConfirmDialog = (): UseConfirmDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [onConfirm, setOnConfirm] = useState<() => Promise<void>>(() => Promise.resolve());

  const openDialog = useCallback((id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setSelectedId(null);
  }, []);

  const confirmAction = useCallback(async () => {
    try {
      await onConfirm();
      closeDialog();
    } catch (error) {
      // Error handling is done in the actual action
      closeDialog();
    }
  }, [onConfirm, closeDialog]);

  const setConfirmAction = useCallback((action: () => Promise<void>) => {
    setOnConfirm(() => action);
  }, []);

  return {
    isOpen,
    selectedId,
    openDialog,
    closeDialog,
    confirmAction,
    setConfirmAction,
  };
}; 