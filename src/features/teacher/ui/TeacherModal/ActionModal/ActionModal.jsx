import { Modal, Button, Input, message, Form } from "antd";
import React, { useState } from "react";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { AccountApi } from "@features/teacher/api/teacherAPI"; // Import AccountApi

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

const AccountModal = ({ isEdit = false, initialData = null }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onCreate = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Prepare account data theo định dạng của API
      const accountData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password || undefined, // Password có thể không bắt buộc
        teacherCode: values.teacherId, // Sử dụng teacherId làm teacherCode
        roleIDs: ["teacher"], // Vai trò là "teacher"
      };

      // Gọi API để tạo tài khoản
      await AccountApi.createAccount(accountData);

      queryClient.invalidateQueries({ queryKey: ["accountList"] });
      message.success("Account created successfully!");
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating account:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const onUpdate = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Prepare account data
      const accountData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        teacherCode: values.teacherId,
        password: values.password || undefined,
        roleIDs: ["teacher"],
      };

      // Gọi API để cập nhật tài khoản (giả lập vì chưa có API update)
      await AccountApi.updateAccount(initialData?.ID, accountData);

      queryClient.invalidateQueries({ queryKey: ["accountList"] });
      message.success("Account updated successfully!");
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(`Error updating account:`, error);
      message.error("Failed to update account. Please try again.");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {isEdit ? (
        <Button onClick={showModal} className="border-none hover:border-none">
          Edit
        </Button>
      ) : (
        <Button
          onClick={showModal}
          className="rounded-[50px] bg-[#003087] p-6 text-white font-[500] lg:text-[16px] md:text-[14px]"
        >
          Create Account
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
            <Form.Item>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleCancel}
                  className="h-[52px] w-[124px] rounded-[50px] border-[1px] border-[#003087] text-[#003087] lg:text-[16px] md:text-[14px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={isEdit ? onUpdate : onCreate}
                  htmlType="submit"
                  className="h-[52px] w-[124px] rounded-[50px] bg-[#003087] text-white text-[14px] md:text-[16px] "
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

export default AccountModal;
