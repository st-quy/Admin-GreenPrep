import { Modal, Button, Input, message, Form, Switch } from "antd";
import React, { useState } from "react";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateTeacher,
  useUpdateTeacher,
} from "@features/teacher/hook/useTeacherQuery";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

// Hàm yupSync để tích hợp Yup với Ant Design Form
const yupSync = (schema) => ({
  async validator({ field }, value) {
    try {
      await schema.validateSyncAt(field, { [field]: value });
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

// Định nghĩa schema validation bằng Yup
const accountSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  teacherId: Yup.string().required("Teacher ID is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

const TeacherActionModal = ({ initialData = null }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isEdit = initialData !== null;
  // @ts-ignore
  const { mutate: createTeacher, isPending: isCreatingTeacher } =
    useCreateTeacher();
  // @ts-ignore
  const { mutate: updateTeachers, isPending: isUpdatingTeacher } =
    useUpdateTeacher();
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  // @ts-ignore
  const onAction = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        teacherCode: values.teacherId,
        password: values.password || undefined,
        roleIDs: ["teacher"],
        status: values.status,
      };
      if (!isEdit) {
        // @ts-ignore
        createTeacher(data, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            message.success("Account created successfully!");
            setOpen(false);
            form.resetFields();
          },
          onError: (err) => {
            console.error("Error creating account:", err);
            message.error(
              // @ts-ignore
              err.response?.data?.message ||
                "Failed to create account. Please try again."
            );
          },
        });
      } else {
        // @ts-ignore
        updateTeachers(data, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            message.success("Account update successfully!");
            setOpen(false);
            form.resetFields();
          },
          onError: (err) => {
            console.error("Error update account:", err);
            message.error(
              // @ts-ignore
              err.response?.data?.message ||
                "Failed to update account. Please try again."
            );
          },
        });
      }
    } catch (error) {
      console.error("Error update account:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to update account. Please try again."
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {isEdit ? (
        <EditOutlined
          onClick={showModal}
          className="text-[#003087] text-[20px]"
        />
      ) : (
        <Button
          icon={<PlusCircleOutlined />}
          onClick={showModal}
          style={{ borderColor: "#2563eb", borderRadius: "50px" }}
          className="bg-[#003087] text-white py-6 rounded-full px-4 text-base border-none"
        >
          Create new account
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
        footer={null}
      >
        <div className="px-6 pt-4">
          <div className="font-bold text-[26px] md:text-[30px]">
            {isEdit ? "Update an account" : "Create an account"}
          </div>
          <p className="mb-8 text-[#637381] text-[16px]">
            {isEdit ? "Update a teacher account." : "Create a teacher account."}
          </p>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              firstName: isEdit ? initialData?.firstName : "",
              lastName: isEdit ? initialData?.lastName : "",
              email: isEdit ? initialData?.email : "",
              teacherId: isEdit ? initialData?.teacherId : "",
              password: "",
              status: isEdit ? initialData?.status : true,
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={
                  <span className="text-[16px]">
                    First name
                    <span className="text-red-500">*</span>
                  </span>
                }
                // @ts-ignore
                rules={[yupSync(accountSchema)]}
                name="firstName"
              >
                <Input className="h-[46px]" placeholder="First name" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-[16px]">
                    Last name <span className="text-red-500">*</span>
                  </span>
                }
                // @ts-ignore
                rules={[yupSync(accountSchema)]}
                name="lastName"
              >
                <Input className="h-[46px]" placeholder="Last name" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={
                  <span className="text-[16px]">
                    Email <span className="text-red-500">*</span>
                  </span>
                }
                // @ts-ignore
                rules={[yupSync(accountSchema)]}
                name="email"
              >
                <Input className="h-[46px]" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-[16px]">
                    Teacher Code <span className="text-red-500">*</span>
                  </span>
                }
                // @ts-ignore
                rules={[yupSync(accountSchema)]}
                name="teacherId"
              >
                <Input className="h-[46px]" placeholder="Teacher ID" />
              </Form.Item>
            </div>
            <Form.Item
              label={
                <span className="text-[16px]">
                  Password <span className="text-red-500">*</span>
                </span>
              }
              // @ts-ignore
              rules={[yupSync(accountSchema)]}
              name="password"
            >
              <Input.Password className="h-[46px]" placeholder="Password" />
            </Form.Item>

            <div className="flex flex-row items-center">
              <div className="w-1/2">
                <Form.Item
                  label={<span className="text-[16px]">Status</span>}
                  className="flex self-center mt-6"
                  layout="horizontal"
                  // @ts-ignore
                  name="status"
                >
                  <Switch className="ml-2" />
                </Form.Item>
              </div>
              <div>
                <Button
                  onClick={handleCancel}
                  className="h-[50px] w-[100px] md:h-[52px] md:w-[124px] rounded-[50px] border-[1px] border-[#003087] text-[#003087] lg:text-[16px] md:text-[14px] mr-4"
                >
                  Cancel
                </Button>
                <Button
                  // @ts-ignore
                  onClick={onAction}
                  htmlType="submit"
                  className="h-[50px] w-[100px] md:h-[52px] md:w-[124px] rounded-[50px] bg-[#003087] text-white text-[14px] md:text-[16px] "
                >
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default TeacherActionModal;
