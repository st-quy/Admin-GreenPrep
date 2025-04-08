import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "@features/auth/hooks/index";
import { ChangePasswordSchema } from "@features/profile/schema";
import { yupSync } from "@shared/lib/utils";

const ChangePassword = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    changePassword(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isOpen}
      footer={null}
      centered
      onCancel={onClose}
    >
      <div className="p-6">
        <Typography.Title level={3} className="font-bold mb-2">
          Change Password
        </Typography.Title>
        <p className="text-gray-600 mb-6">
          Secure your account with a new password.
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          size="large"
        >
          <Form.Item
            label="Current password"
            name="currentPassword"
            required
            rules={[yupSync(ChangePasswordSchema)]}
          >
            <Input.Password placeholder="Current password" />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            required
            rules={[yupSync(ChangePasswordSchema)]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
          <Form.Item
            label="Confirm new password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "New password confirmation is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("New passwords must match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                onClose();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangePassword;
