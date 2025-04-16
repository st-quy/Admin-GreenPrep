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
import React, { useState } from "react";
const { RangePicker } = DatePicker;
import { yupSync } from "@shared/lib/utils";
import { sessionSchema } from "@features/classDetail/validate";
import {
  useCreateSession,
  useGenerateSessionKeyMutation,
  useUpdateSession,
} from "@features/classDetail/hooks/useClassDetail";
import dayjs from "dayjs";
import {
  EditOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useGetTopics } from "@features/topic/hooks";

const ActionModal = ({ initialData = null, classId = null }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const isEdit = initialData !== null;

  const { data: topics } = useGetTopics();

  const { mutateAsync: generateKey, isPending: isGenerating } =
    useGenerateSessionKeyMutation();
  const { mutate: sessionActionUpdate, isPending: isLoadingUpdate } =
    useUpdateSession();
  const { mutate: sessionActionCreate, isPending: isLoadingCreate } =
    useCreateSession();

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

  const onAction = async (values) => {
    try {
      // Prepare session data
      const sessionData = {
        sessionId: initialData?.ID || null,
        sessionName: values.sessionName,
        sessionKey: values.sessionKey,
        startTime: values.dateRange ? values.dateRange[0].toISOString() : null,
        endTime: values.dateRange ? values.dateRange[1].toISOString() : null,
        examSet: values.examSet,
        ClassID: classId,
      };

      if (isEdit) {
        sessionActionUpdate(sessionData, {
          onSuccess: () => {
            form.resetFields();
            setOpen(false);
          },
        });
      } else {
        sessionActionCreate(sessionData, {
          onSuccess: () => {
            form.resetFields();
            setOpen(false);
          },
        });
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Please field all the fields correctly."
      );
    }
  };

  return (
    <>
      {isEdit ? (
        <span className="text-xl">
          <EditOutlined onClick={showModal} className="hover:opacity-50" />
        </span>
      ) : (
        <Button
          onClick={showModal}
          className="!rounded-[50px] !bg-primaryColor !p-6 !text-white font-[500] lg:text-[16px] md:text-[14px]"
        >
          Create Session
        </Button>
      )}
      <Modal
        open={open}
        okText={isEdit ? "Update" : "Create"}
        closable={false}
        confirmLoading={isLoadingUpdate || isLoadingCreate}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={null}
      >
        <div className="px-6">
          <h4 className="font-[700] lg:text-[30px] md:text-[28px]">
            {isEdit ? "Update session" : "Create Session"}
          </h4>
          <p className="mb-6 font-[500] text-primaryTextColor lg:text-[18px] md:text-[16px]">
            {isEdit
              ? "Modify and extend the current session."
              : "Set up a new session quickly and easily."}
          </p>
          <Form
            form={form}
            onFinish={onAction}
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
              required
              rules={[yupSync(sessionSchema)]}
              name="sessionName"
            >
              <Input className="!h-[46px] " placeholder="Session Name" />
            </Form.Item>
            <Form.Item
              required
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
              required
              layout="vertical"
              label="Exam Set"
              // @ts-ignore
              rules={[yupSync(sessionSchema)]}
              name="examSet"
            >
              <Select
                className="!h-[46px] !w-full"
                placeholder="Exam Set"
                options={topics?.map((topic) => ({
                  label: topic.Name,
                  value: topic.ID,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Date Range"
              // @ts-ignore
              required
              rules={[yupSync(sessionSchema)]}
              name="dateRange"
            >
              <RangePicker
                className="!w-full !h-[46px] py-[12px] pr-[16px] ps-[20px]"
                showTime
                format="DD-MM-YYYY HH:mm:ss"
              />
            </Form.Item>
            <div className="flex justify-end gap-4">
              <Button
                onClick={handleCancel}
                className="h-[52px] w-[124px] rounded-[50px] border-[1px] border-primaryColor text-primaryColor lg:text-[16px] md:text-[14px]"
              >
                Cancel
              </Button>
              <Button
                loading={isLoadingUpdate || isLoadingCreate}
                htmlType="submit"
                className="h-[52px] w-[124px] rounded-[50px] bg-primaryColor text-white lg:text-[16px] md:text-[14px]"
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ActionModal;
