import React from "react";
import { Dialog } from "@headlessui/react";
import { Warning } from "../../../../assets/images";
import { Button } from "antd";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Semi-transparent background overlay */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Dialog position */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <div className="h-12 w-12 flex items-center justify-center">
                <img
                  src={Warning}
                  alt="Warning"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
              Are you sure you want to delete this class?
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mb-6">
              After you delete this class, you cannot view this class again.
            </Dialog.Description>
          </div>

          <div className="flex justify-center gap-4 mt-auto">
            <Button
              onClick={onClose}
              type="default"
              className="w-[113px] h-[40px] !text-[#003087] shadow-[0_0_0_2px_rgba(255,255,255,0.3)] !border-gray-120 rounded-[50px] font-inter font-medium text-[16px] leading-[24px] bg-[#FFFFFF] text-[#003087] hover:!text-[#003087] focus:!bg-[#FFFFFF] focus:!text-[#003087] hover:!border-[#D0D5DD]"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              type="primary"
              danger
              className="w-[113px] h-[40px] rounded-[50px] font-inter font-medium text-[16px] leading-[24px] bg-[#E10E0E] text-[#FFFFFF] hover:!bg-[#c70c0c] hover:!text-[#FFFFFF] focus:!bg-[#E10E0E] focus:!text-[#FFFFFF]"
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
