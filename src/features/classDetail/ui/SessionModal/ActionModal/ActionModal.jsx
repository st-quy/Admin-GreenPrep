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
        <Button onClick={showModal} className="!border-none !hover:border-none">
          <img src={EditIcon} alt="Edit" width={20} height={20} />
        </Button>
      ) : (
        <Button
          onClick={showModal}
          className="!rounded-[50px] !bg-[#003087] !p-6 !text-white font-[500] lg:text-[16px] md:text-[14px]"
        >
          Create Session
        </Button>
      )}
      <Modal
        open={open}
        okText={isEdit ? "Update" : "Create"}
        closable={false}
        confirmLoading={confirmLoading}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={(_) => (
          <div className="flex justify-end gap-4 py-4">
            <Button
              onClick={handleCancel}
              className="h-[52px] w-[124px] rounded-[50px] border-[1px] border-[#003087] text-[#003087] lg:text-[16px] md:text-[14px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              className="h-[52px] w-[124px] rounded-[50px] bg-[#003087] text-white lg:text-[16px] md:text-[14px]"
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        )}
      >
        <div className="px-6 pt-4">
          <h4 className="font-[700] lg:text-[30px] md:text-[28px]">
            {isEdit ? "Update session" : "Create Session"}
          </h4>
          <p className="mb-6 font-[500] text-[#637381] lg:text-[18px] md:text-[16px]">
            {isEdit
              ? "Modify and extend the current session."
              : "Set up a new session quickly and easily."}
          </p>
          <form className="mb-14">
            <div className="mb-2 flex w-full flex-col">
              <label
                className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
                htmlFor=""
              >
                Session Name
                {errors.sessionName ? (
                  <span className="ms-2 text-[16px] text-red-500">
                    {errors.sessionName}
                  </span>
                ) : (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <Input
                className="py-[12px] pr-[16px] ps-[20px]"
                placeholder="Session Name"
                value={formState.sessionName}
                onChange={(e) =>
                  handleInputChange("sessionName", e.target.value)
                }
              />
            </div>
            <div className="mb-2 flex w-full flex-col">
              <label
                className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
                htmlFor=""
              >
                Session Key
                {errors.sessionKey ? (
                  <span className="ms-2 xl:text-[16px] text-red-500">
                    {errors.sessionKey}
                  </span>
                ) : (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <Input
                className="py-[12px] pr-[16px] ps-[20px]"
                placeholder="Session Key"
                value={formState.sessionKey}
                onChange={(e) =>
                  handleInputChange("sessionKey", e.target.value)
                }
              />
            </div>
            <div className="mb-2 flex w-full flex-col">
              <label
                className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
                htmlFor=""
              >
                {" "}
                Exam Set
                {errors.examSet ? (
                  <span className="ms-2 xl:text-[16px] text-red-500">
                    {errors.examSet}
                  </span>
                ) : (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <Select
                className="!h-[46px] !w-full"
                value={formState.examSet}
                onChange={(value) => handleInputChange("examSet", value)}
                options={[]}
              />
            </div>
            <div className="mb-2 flex w-full flex-col">
              <label
                className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
                htmlFor=""
              >
                Start
                {errors.dateRange ? (
                  <span className="ms-2 xl:text-[16px] text-red-500">
                    {errors.dateRange}
                  </span>
                ) : (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <RangePicker
                className="py-[12px] pr-[16px] ps-[20px]"
                showTime
                value={formState.dateRange}
                onChange={(dates) => handleInputChange("dateRange", dates)}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ActionModal;
