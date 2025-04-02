import { useState } from "react";

const useConfirmDelete = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedId(null);
  };

  return {
    isDeleteDialogOpen,
    selectedId,
    openDeleteDialog,
    closeDeleteDialog,
  };
};

export default useConfirmDelete;
