import React, { useState, useEffect } from "react";
import ClassModal from "./components/ClassModal";
import { Button, notification } from "antd";
import { updateClass } from "./services/classAPI";
import { EditOutlined } from "@ant-design/icons";

const UpdateClass = ({ classData, onUpdateClass, existingClasses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenModal = () => {
    setError("");
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  };

  const handleCloseModal = () => {
    setError("");
    setIsModalOpen(false);
  };

  const handleSubmit = async (updatedClass) => {
    setIsUpdating(true);
    // Trì hoãn reload trang 2 giây
    setTimeout(async () => {
      try {
        const updatedData = await updateClass(classData.id, updatedClass);
        onUpdateClass(updatedData); // Gọi hàm cập nhật danh sách class
        setIsModalOpen(false);

        notification.success({
          message: "Class updated successfully",
          description: `Class "${updatedClass.name}" has been updated.`,
        });
      } catch (error) {
        setError(
          "An error occurred while updating the class. Please try again."
        );
        console.error("Error updating class:", error);
      } finally {
        setIsUpdating(false);
      }
    }, 2000); // 2000ms = 2 giây
  };

  return (
    <>
      <EditOutlined
        onClick={handleOpenModal}
        className="cursor-pointer text-[22px] "
      />
      <ClassModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title="Update class"
        description="Update your class information."
        buttonText="Update"
        initialClassName={classData.name}
        error={error}
        isLoading={isUpdating}
      />
    </>
  );
};

export default UpdateClass;
