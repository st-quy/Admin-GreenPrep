import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { passwordSchema } from '../schema/profileButtonsSchema';

const ChangePassword = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const verifyCurrentPassword = async (password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  const handleSubmit = async (values) => {
    try {
      await passwordSchema.validate(values, { abortEarly: false });

      const isCurrentPasswordValid = await verifyCurrentPassword(
        values.currentPassword
      );
      if (!isCurrentPasswordValid) {
        form.setFields([
          {
            name: "currentPassword",
            errors: ["Incorrect current password"],
          },
        ]);
        return;
      }

      const changePasswordPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            console.log("Password change submitted:", values);
            resolve();
          } catch (error) {
            reject(new Error("Failed to change password"));
          }
        }, 1000);
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timeout"));
        }, 3000);
      });

      await Promise.race([changePasswordPromise, timeoutPromise]);

      message.success("Password changed successfully");
      onClose();
      form.resetFields();
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        console.log("Validation errors:", errors);
      } else if (err.message === "Request timeout") {
        message.error("Request timed out. Please try again.");
      } else {
        message.error("Failed to change password. Please try again.");
      }
    }
  };

  return (
    <Modal
      title={
        <div className="mb-4">
          <h4 className="text-xl font-bold mb-2">Change Password</h4>
          <p className="text-gray-500">
            Secure your account with a new password.
          </p>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={
            <span className="font-medium">
              Current password <span className="text-red-500">*</span>
            </span>
          }
          name="currentPassword"
          rules={[
            { required: true, message: "Current password is required" },
          ]}
          validateTrigger="onBlur"
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your current password"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              New password <span className="text-red-500">*</span>
            </span>
          }
          name="newPassword"
          rules={[
            { required: true, message: "New password is required" },
            { min: 8, message: "Password must be at least 8 characters" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your new password"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Confirm new password <span className="text-red-500">*</span>
            </span>
          }
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords must match"));
              },
            }),
          ]}
          validateTrigger="onBlur"
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Confirm your new password"
          />
        </Form.Item>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={onClose}
            className="h-[46px] w-[113px] rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-[46px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassword; 