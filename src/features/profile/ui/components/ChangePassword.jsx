import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { passwordSchema } from '../../schema/profileButtonsSchema';

const ChangePassword = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const validateField = async (fieldName, value) => {
    try {
      await passwordSchema.validateAt(fieldName, form.getFieldsValue());
      form.setFields([{ name: fieldName, errors: [] }]);
    } catch (err) {
      form.setFields([{ name: fieldName, errors: [err.message] }]);
    }
  };

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
        Object.keys(errors).forEach((field) => {
          form.setFields([
            {
              name: field,
              errors: [errors[field]],
            },
          ]);
        });
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
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your current password"
            onChange={(e) => validateField("currentPassword", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              New password <span className="text-red-500">*</span>
            </span>
          }
          name="newPassword"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your new password"
            onChange={(e) => validateField("newPassword", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Confirm new password <span className="text-red-500">*</span>
            </span>
          }
          name="confirmPassword"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Confirm your new password"
            onChange={(e) => validateField("confirmPassword", e.target.value)}
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