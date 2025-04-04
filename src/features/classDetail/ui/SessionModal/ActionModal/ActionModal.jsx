import {
  Modal,
  Button,
  DatePicker,
  Select,
  Input,
  message,
  Form,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import EditIcon from "@assets/icons/class-detail/edit.png";
import GenerateIcon from "@assets/icons/class-detail/generate.png";
const { RangePicker } = DatePicker;
import { yupSync } from "@shared/lib/utils";
import { sessionSchema } from "@features/classDetail/validate";
import {
  useCreateSession,
  useGenerateSessionKeyMutation,
  useUpdateSession,
} from "@features/classDetail/hooks/useClassDetail";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

const ActionModal = ({
  isEdit = false,
  initialData = null,
  classId = null,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { mutateAsync: generateKey, isPending: isGenerating } =
    useGenerateSessionKeyMutation();
  const { mutate: createSession, isPending: isCreatingSession } =
    useCreateSession();
  const { mutate: updateSession, isPending: isUpdatingSession } =
    useUpdateSession();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleGenerateSessionKey = async () => {
    const data = await generateKey();
    form.setFieldsValue({ sessionKey: data.key });
  };

  const onCreate = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Prepare session data
      const sessionData = {
        sessionName: values.sessionName,
        sessionKey: values.sessionKey,
        startTime: values.dateRange ? values.dateRange[0].toISOString() : null,
        endTime: values.dateRange ? values.dateRange[1].toISOString() : null,
        examSet: values.examSet,
        ClassID: classId,
      };
      createSession(
        // @ts-ignore
        { classId, sessionData: JSON.stringify(sessionData) },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classDetail"] });
            message.success("Session created successfully!");
            setOpen(false);
            form.resetFields();
          },
          onError: () => {
            message.error("Please field all the fields correctly.");
          },
        }
      );
    } catch (error) {
      message.error("Please field all the fields correctly.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const onUpdate = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Prepare session data
      const sessionData = {
        sessionName: values.sessionName,
        sessionKey: values.sessionKey,
        startTime: values.dateRange ? values.dateRange[0].toISOString() : null,
        endTime: values.dateRange ? values.dateRange[1].toISOString() : null,
        examSet: values.examSet,
        ClassID: classId,
      };

      updateSession(
        // @ts-ignore
        { sessionId: initialData.ID, sessionData: JSON.stringify(sessionData) },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classDetail"] });
            message.success("Session update successfully!");
            setOpen(false);
            form.resetFields();
          },
          onError: () => {
            message.error("Please field all the fields correctly.");
          },
        }
      );
    } catch (error) {
      message.error(`Failed to update session. Please try again.`);
    } finally {
      setConfirmLoading(false);
    }
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
          <Form
            form={form}
            className="mb-14"
            layout="vertical"
            initialValues={{
              sessionName: isEdit ? initialData?.sessionName : "",
              sessionKey: isEdit ? initialData?.sessionKey : "",
              examSet: isEdit ? initialData?.examSet : "",
              dateRange:
                isEdit && initialData?.startTime && initialData?.endTime
                  ? [dayjs(initialData.startTime), dayjs(initialData.endTime)]
                  : undefined,
            }}
          >
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
              <Input
                placeholder="Session Key"
                className="!h-[46px]"
                suffix={
                  <div onClick={handleGenerateSessionKey}>
                    {isGenerating ? (
                      <Spin
                        indicator={<LoadingOutlined spin />}
                        size="default"
                      />
                    ) : (
                      <ReloadOutlined />
                    )}
                  </div>
                }
              />
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
                placeholder="Exam Set"
                options={[
                  { label: "Exam 1", value: "english" },
                  { label: "Exam 2", value: "math" },
                  { label: "Exam 3", value: "history" },
                  { label: "Exam 4", value: "museum" },
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
                format="DD-MM-YYYY HH:mm:ss"
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
                  onClick={isEdit ? onUpdate : onCreate}
                  loading={isCreatingSession || isUpdatingSession}
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
