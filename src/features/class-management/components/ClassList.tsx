import React, { useEffect } from 'react';
import { Class } from '../api';
import { useClasses } from '../hooks/useClasses';
import { useConfirmDialog } from '../hooks/useConfirmDialog';
import ConfirmationDialog from './ConfirmationDialog';

interface ClassListProps {
  initialClasses: Class[];
}

const ClassList: React.FC<ClassListProps> = ({ initialClasses }) => {
  const { classes, isLoading, deleteClassItem } = useClasses(initialClasses);
  const { isOpen, selectedId, openDialog, closeDialog, confirmAction, setConfirmAction } = useConfirmDialog();

  useEffect(() => {
    const handleDelete = async () => {
      if (selectedId) {
        await deleteClassItem(selectedId);
      }
    };
    setConfirmAction(handleDelete);
  }, [deleteClassItem, selectedId, setConfirmAction]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No classes found. Click 'Create class' to add a new class.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                CLASS NAME
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                NUMBER OF SESSIONS
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classes.map((classItem) => (
              <tr key={classItem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {classItem.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {classItem.studentCount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    type="button"
                    onClick={() => openDialog(classItem.id)}
                    className="rounded bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationDialog
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={confirmAction}
      />
    </>
  );
};

export default ClassList; 