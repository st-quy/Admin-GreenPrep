"use client";
import { Modal, Button, DatePicker, Select, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import EditIcon from "@assets/icons/class-detail/edit.png";

const { RangePicker } = DatePicker;

const ActionModal = ({ isEdit = false, initialData = null, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [errors, setErrors] = useState({
    sessionName: "",
    sessionKey: "",
    examSet: "",
    dateRange: "",
  });
  const [formState, setFormState] = useState({
    sessionName: "",
    sessionKey: "",
    examSet: "",
    dateRange: null,
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormState(initialData);
    }
  }, [isEdit, initialData]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (validateForm()) {
      setConfirmLoading(true);
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(false);
        message.success(
          isEdit ? "Updated successfully!" : "Created successfully!"
        );
        if (onSubmit) {
          onSubmit(formState);
        }
      }, 2000);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.sessionName)
      newErrors.sessionName = "Session Name is required.";
    if (!formState.sessionKey)
      newErrors.sessionKey = "Session Key is required.";
    if (!formState.examSet) newErrors.examSet = "Exam Set is required.";
    if (!formState.dateRange) newErrors.dateRange = "Date range is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      {isEdit ? (
        <Button onClick={showModal} className="!hover:border-none !border-none">
          <img src={EditIcon} alt="Edit" width={20} height={20} />
        </Button>
      ) : (
        <Button
          onClick={showModal}
          className="!bg-[#003087] !p-6 !text-white !rounded-[50px]"
        >
          Create Session
        </Button>
      )}
      <Modal
        open={open}
        onOk={handleOk}
        okText={isEdit ? "Update" : "Create"}
        okButtonProps={{
          className: "!bg-[#003087] !text-white !rounded-[50px]",
        }}
        cancelButtonProps={{
          className:
            "!border !border-[#003087] !bg-white !text-[#003087] !rounded-[50px]",
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <h4 className="text-[30px]">
          {isEdit ? "Edit Session" : "Create Session"}
        </h4>
        <p className="text-[#637381] xl:text-[18px] xl:mb-10">
          {isEdit
            ? "Update the session details below."
            : "Fill in the details to create a new session."}
        </p>
        <form>
          <div className="w-full flex flex-col mb-2">
            <label className="mb-2 xl:text-[16px]" htmlFor="">
              Session Name
              {errors.sessionName ? (
                <span className="text-red-500 xl:text-[16px] ms-2">
                  {errors.sessionName}
                </span>
              ) : (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <Input
              placeholder="Session Name"
              value={formState.sessionName}
              onChange={(e) => handleInputChange("sessionName", e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col mb-2">
            <label className="mb-2 xl:text-[16px]" htmlFor="">
              Session Key
              {errors.sessionKey ? (
                <span className="text-red-500 text-sm ms-2">
                  {errors.sessionKey}
                </span>
              ) : (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <Input
              placeholder="Session Key"
              value={formState.sessionKey}
              onChange={(e) => handleInputChange("sessionKey", e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col mb-2">
            <label className="mb-2 xl:text-[16px]" htmlFor="">
              Exam Set
              {errors.examSet ? (
                <span className="text-red-500 text-sm ms-2">
                  {errors.examSet}
                </span>
              ) : (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <Select
              className="!w-full"
              value={formState.examSet}
              onChange={(value) => handleInputChange("examSet", value)}
              options={[]}
            />
          </div>
          <div className="w-full flex flex-col mb-2">
            <label className="mb-2 " htmlFor="">
              Start
              {errors.dateRange ? (
                <span className="text-red-500 text-sm ms-2">
                  {errors.dateRange}
                </span>
              ) : (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <RangePicker
              showTime
              value={formState.dateRange}
              onChange={(dates) => handleInputChange("dateRange", dates)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ActionModal;
