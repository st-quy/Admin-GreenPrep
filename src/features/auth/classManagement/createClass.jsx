import React, { useState } from "react";
import ClassModal from "./components/ClassModal";
import { Button } from "antd";
import { createClass } from "./services/classAPI";

const CreateClass = ({ onAddClass, existingClasses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

  const handleAddClass = async (newClass) => {
    if (existingClasses.some((cls) => cls.name === newClass.name)) {
      setError("Class name already exists. Please choose a different name.");
      return;
    }

    if (!newClass.name.trim()) {
      setError("Class name is required.");
      return;
    }

    if (newClass.name.length < 3 || newClass.name.length > 50) {
      setError("Class must be between 3 and 50 characters.");
      return;
    }

    setIsCreating(true);
    try {
      const createdClass = await createClass(newClass);
      onAddClass(createdClass);
      setIsModalOpen(false);
    } catch (error) {
      setError("An error occurred while creating the class. Please try again.");
      console.error("Error creating class:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="bg-[#003087] text-[#FFFFFF] w-[188px] h-[50px] rounded-[50px] 
        px-[28px] py-[13px] border-none hover:bg-[#0c4477] transition-colors flex items-center justify-center gap-[10px] cursor-pointer hover:!bg-[#003087] hover:!text-[#FFFFFF] focus:!ring-2 focus:!ring-[#003087]"
      >
        Create new class
      </Button>
      <ClassModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddClass}
        title="Create new class"
        description="Set up and manage a new class."
        buttonText="Create"
        error={error}
        isLoading={isCreating}
      />
    </>
  );
};

export default CreateClass;
