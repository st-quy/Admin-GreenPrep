import React from 'react';
import { Dialog } from '@headlessui/react';
import { Warning } from '../../../assets/images';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 bg-black/30 transition-opacity duration-300" aria-hidden="true" />

      {/* Dialog position */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="h-12 w-12 flex items-center justify-center">
                <img src={Warning} alt="Warning" className="w-full h-full object-contain" />
              </div>
            </div>
            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
              Are you sure you want to delete this class?
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mb-6">
              After you delete this class, you cannot view this class again.
            </Dialog.Description>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              className="rounded-md px-6 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-red-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog; 