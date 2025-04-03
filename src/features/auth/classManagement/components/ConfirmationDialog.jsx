import React, { useState } from "react";
import { Modal, Button, notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import WarningIcon from "../../../../assets/images/Warning.png";

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
        });
        onClose();
      } catch (error) {
        notification.error({
          message: "Error deleting class",
          description: "An error occurred while deleting the class. Please try again.",
          icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
          placement: "topRight",
        });
        console.error("Error deleting class:", error);
      } finally {
        setIsDeleting(false);
      }
    }, 2000);
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      className="confirm-delete-modal"
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '90vw'
      }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2">
          <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">
            <img 
              src={WarningIcon} 
              alt="Warning" 
              className="w-full h-full object-contain select-none"
            />
          </div>
          <div className="flex-1 text-center sm:text-left pt-2">
            <h3 className="text-[20px] sm:text-[24px] font-medium text-gray-900 mb-6">
              Are you sure you want to delete this class?
            </h3>
            <p className="text-[14px] sm:text-[16px] text-gray-500 mb-6">
              After you delete this class, you cannot view this class again.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2 mt-6">
          <Button
            onClick={onClose}
            className="w-full sm:w-[109px] h-[50px] rounded-[50px]"
            disabled={isDeleting}
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            type="primary"
            danger
            loading={isDeleting}
            className="w-full sm:w-[109px] h-[50px] rounded-[50px]"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
