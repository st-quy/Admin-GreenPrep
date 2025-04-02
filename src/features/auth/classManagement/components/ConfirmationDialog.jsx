import React, { useState } from "react";
import { Modal, Button, notification, Space } from "antd";
import {
  ExclamationCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";

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
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={440}
      centered
      className="confirm-delete-modal"
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      <div className="flex flex-col items-center text-center py-4">
        <div className="mb-4 relative">
          <div className="h-16 w-16 flex items-center justify-center bg-red-50 rounded-full">
            <ExclamationCircleFilled className="text-4xl text-red-500" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Are you sure you want to delete this class?
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          After you delete this class, you cannot view this class again.
        </p>

        <Space size="middle">
          <Button
            onClick={onClose}
            className="min-w-[113px] h-[40px] !text-gray-700 border-gray-300 hover:!text-gray-900 hover:!border-gray-400 rounded-[50px] font-medium text-[15px]"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            type="primary"
            danger
            loading={isDeleting}
            className="min-w-[113px] h-[40px] rounded-[50px] font-medium text-[15px] hover:!bg-red-600 focus:!bg-red-500"
          >
            Delete
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
