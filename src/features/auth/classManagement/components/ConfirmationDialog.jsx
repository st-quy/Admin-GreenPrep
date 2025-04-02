import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Warning } from "../../../../assets/images";
import { Button, notification, Spin } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(async () => {
      try {
        await onConfirm();
        notification.success({
          message: "Class deleted successfully",
          description: "The class has been deleted.",
          placement: "topRight",
          style: {
            borderRadius: "8px",
          },
        });
        onClose();
      } catch (error) {
        notification.error({
          message: "Error deleting class",
          description:
            "An error occurred while deleting the class. Please try again.",
          icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
          placement: "topRight",
          style: {
            borderRadius: "8px",
          },
        });
        console.error("Error deleting class:", error);
      } finally {
        setIsDeleting(false);
      }
    }, 2000);
  };

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
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              type="primary"
              danger
              className="w-[113px] h-[40px] rounded-[50px] font-inter font-medium text-[16px] leading-[24px] bg-[#E10E0E] text-[#FFFFFF] hover:!bg-[#c70c0c] hover:!text-[#FFFFFF] focus:!bg-[#E10E0E] focus:!text-[#FFFFFF]"
              loading={isDeleting}
            >
              {isDeleting ? <Spin size="small" /> : "Delete"}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
