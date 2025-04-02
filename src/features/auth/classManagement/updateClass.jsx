import React, { useState } from "react";
import ClassModal from "./components/ClassModal";
import { Button } from "antd";
import { updateClass } from "./services/classAPI";

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
    if (!updatedClass.name.trim()) {
      setError("Class name is required.");
      return;
    }

    if (updatedClass.name.length < 3 || updatedClass.name.length > 50) {
      setError("Class must be between 3 and 50 characters.");
      return;
    }

    if (
      existingClasses.some(
        (cls) =>
          cls.name.toLowerCase() === updatedClass.name.toLowerCase() &&
          cls.id !== classData.id
      )
    ) {
      setError("Class name already exists. Please choose a different name.");
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(updatedClass.name)) {
      setError("Class name can only contain letters and numbers.");
      return;
    }

    setIsUpdating(true);
    try {
      const updatedData = await updateClass(classData.id, updatedClass);
      onUpdateClass(updatedData);
      setIsModalOpen(false);
    } catch (error) {
      setError("An error occurred while updating the class. Please try again.");
      console.error("Error updating class:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="cursor-pointer hover:!border-gray-300"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3628_2380)">
            <path
              d="M22.9501 4.8748C21.7501 3.5998 20.4751 2.3248 19.2001 1.0873C18.9376 0.824805 18.6376 0.674805 18.3001 0.674805C17.9626 0.674805 17.6251 0.787305 17.4001 1.0498L3.26261 15.0748C3.03761 15.2998 2.88761 15.5623 2.77511 15.8248L0.712614 22.1248C0.600114 22.4248 0.675114 22.7248 0.825114 22.9498C1.01261 23.1748 1.27511 23.3248 1.61261 23.3248H1.76261L8.17511 21.1873C8.47511 21.0748 8.73761 20.9248 8.92511 20.6998L22.9876 6.6748C23.2126 6.4498 23.3626 6.1123 23.3626 5.77481C23.3626 5.4373 23.2126 5.1373 22.9501 4.8748ZM7.72511 19.5373C7.68761 19.5748 7.65011 19.5748 7.61261 19.6123L2.77511 21.2248L4.38761 16.3873C4.38761 16.3498 4.42511 16.3123 4.46261 16.2748L14.7751 5.9998L18.0376 9.26231L7.72511 19.5373ZM19.2001 8.06231L15.9376 4.79981L18.2251 2.5123C19.3126 3.5623 20.4001 4.6873 21.4501 5.77481L19.2001 8.06231Z"
              fill="#003087"
            />
          </g>
          <defs>
            <clipPath id="clip0_3628_2380">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
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
