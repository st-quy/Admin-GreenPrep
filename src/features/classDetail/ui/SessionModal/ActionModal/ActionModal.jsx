import {
  Modal,
  Button,
  DatePicker,
  Select,
  Input,
  message,
  Space,
  Form,
} from "antd";
import React, { useState, useEffect } from "react";
import EditIcon from "@assets/icons/class-detail/edit.png";
import GenerateIcon from "@assets/icons/class-detail/generate.png";
const { RangePicker } = DatePicker;
import { yupSync } from "@shared/lib/utils";
import { sessionSchema } from "@features/classDetail/validate";
import { ClassDetailApi } from "@features/classDetail/classAPI";
import { useCreateSessionMutation } from "@features/classDetail/hooks/useClassDetail";

const ActionModal = ({
  isEdit = false,
  initialData = null,
  classId = null,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const createSession = useCreateSessionMutation();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
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
        footer={(_) => <></>}
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
          <Form form={form} className="mb-14" layout="vertical">
            <Form.Item
              label="Session Name"
              // @ts-ignore
              rules={[yupSync(sessionSchema)]}
              name="sessionName"
            >
              <Input className="!h-[46px] " placeholder="Session Name" />
            </Form.Item>
            <Form.Item
              label="Session Key"
              // @ts-ignore
              rules={[yupSync(sessionSchema)]}
              name="sessionKey"
            >
              <Space.Compact className="!w-full">
                <Input placeholder="Session Key" className="!h-[46px] " />
                <Button className="!h-[46px]">
                  <img src={GenerateIcon} alt="Generate Icon" />
                </Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="Exam Set"
              // @ts-ignore
              rules={[yupSync(sessionSchema)]}
              name="examSet"
            >
              <Select
                className="!h-[46px] !w-full"
                options={[
                  { label: "Math Exam", value: "math" },
                  { label: "Science Exam", value: "science" },
                  { label: "History Exam", value: "history" },
                  { label: "English Exam", value: "english" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Date Range"
              // @ts-ignore
              rules={[yupSync(sessionSchema)]}
              name="dateRange"
            >
              <RangePicker
                className="!w-full !h-[46px] py-[12px] pr-[16px] ps-[20px]"
                showTime
              />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-end gap-4 py-4">
                <Button
                  onClick={handleCancel}
                  className="h-[52px] w-[124px] rounded-[50px] border-[1px] border-[#003087] text-[#003087] lg:text-[16px] md:text-[14px]"
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="h-[52px] w-[124px] rounded-[50px] bg-[#003087] text-white lg:text-[16px] md:text-[14px]"
                >
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ActionModal;
