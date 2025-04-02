import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Input } from "antd";
import {Spin} from "antd";

const ClassModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  buttonText,
  initialClassName = "",
  error,
  isLoading = false,
}) => {
  const [className, setClassName] = useState(initialClassName);

  useEffect(() => {
    if (isOpen) {
      setClassName(initialClassName);
    }
  }, [isOpen, initialClassName]);

  const handleSubmit = () => {
    onSubmit({ name: className });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {isLoading &&(
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <Spin size="large" tip="Loading..." />
        </div>
      )}
      <div className="bg-[#FFFFFF] w-[647.35px] h-[auto] rounded-[20px] shadow-lg p-8 flex flex-col">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-inter font-bold text-[30px] leading-[38px] text-[#000000]">
            {title}
          </h3>
        </div>
        {/* Description */}
        <p className="font-inter font-normal text-[16px] leading-[26px] text-[#637381] mb-6">
          {description}
        </p>
        {/* Input Field */}
        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="className"
            className="font-inter font-medium text-[16px] leading-[24px] text-[#212B36]"
          >
            Class name <span className="text-[#EF4444]">*</span>
          </label>
          <Input
            id="className"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name"
            className="w-full h-[46px] px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[16px] leading-[24px] text-[#212B36] hover:!border-gray-300 focus:!border-gray-300 focus:!shadow-none"
            disabled={isLoading}
          />
          {/* Error display */}
          {error && <p className="text-[#EF4444] text-[16px] mt-2">{error}</p>}
        </div>
        {/* Buttons */}
        <div className="mt-auto flex justify-end gap-4">
          <Button
            onClick={onClose}
            type="default"
            className="w-[113px] h-[40px] !text-[#003087] shadow-[0_0_0_2px_rgba(255,255,255,0.3)] !border-gray-120 rounded-[50px] font-inter font-medium text-[16px] leading-[24px] bg-[#FFFFFF] text-[#003087]  hover:!text-[#003087] focus:!bg-[#FFFFFF] focus:!text-[#003087] hover:!border-[#D0D5DD]"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="primary"
            className="w-[113px] h-[40px] rounded-[50px] font-inter font-medium text-[16px] leading-[24px] bg-[#003087] text-[#FFFFFF] hover:!bg-[#003087] hover:!text-[#FFFFFF] focus:!bg-[#003087] focus:!text-[#FFFFFF]"
            loading={isLoading}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
